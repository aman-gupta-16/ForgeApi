// lib/services/baseQueryWithReauth.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://fogeapi-backend.onrender.com/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn("🔄 Access token expired, trying refresh...");

    // Attempt refresh
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/user/refreshTokenApi",
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as any;

        // Save new tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("❌ Refresh failed, logging out...");
        localStorage.clear();
        // You can also redirect to login page here
      }
    }
  }

  return result;
};
