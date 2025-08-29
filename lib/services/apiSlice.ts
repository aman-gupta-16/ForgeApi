import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

// Define types if you have them
export interface ApiKey {
  _id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
  isSubscribed:boolean;
  count:number;
}

interface Data {
  apikeys:ApiKey[]
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Register User
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

    // Login User
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/user/loginUser",
        method: "POST",
        body: credentials,
      }),
    }),

    // Manually call refresh if you want
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: "/user/refreshToken",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }),
    }),

    // Example: Secure endpoint (auto refresh if expired)
    getProfile: builder.query<any, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),

    // API Keys
    getApiKeys: builder.query({
      query: () => "/apiKey/getAllApiKey",
    }),

    generateApiKey: builder.mutation<any, { name?: string }>({
      query: (body) => ({
        url: "/apiKey/generateApiKey",
        method: "POST",
        body,
      }),
    }),

    deleteApiKey: builder.mutation<any, string>({
      query: (id) => ({
        url: `/apiKey/deleteApiKey/${id}`,
        method: "DELETE",
      }),
    }),
    createApiSchema:builder.mutation({
      query:(formData)=>({
        url:`/userApi/createApiSchema`,
        method:"POST",
        body:formData
      })
    }),
    gettAllCreatedSchema:builder.query({
      query:()=>({
        url:`userApi/gettAllCreatedSchema`,
        method:"GET"
      })
    }),
    deleteSchema:builder.mutation({
      query:(schemaId)=>({
        url:`userApi/deleteSchema/${schemaId}`,
        method:"DELETE",
      })
    })
  }),
});

// Auto-generated hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useGetApiKeysQuery,
  useGenerateApiKeyMutation,
  useDeleteApiKeyMutation,
  useCreateApiSchemaMutation,
  useDeleteSchemaMutation,
  useGettAllCreatedSchemaQuery
} = apiSlice;
