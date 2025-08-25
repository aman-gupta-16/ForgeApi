import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      any,
      {
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
      }
    >({
      query: (userData) => ({
        url: "/user/registerUser",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/user/loginUser",
        method: "POST",
        body: credentials,
      }),
    }),
    // example: secure endpoint that will auto-refresh
    getProfile: builder.query<any, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
} = apiSlice;
