import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/users/update-password',
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
    }),

    // Mutation to logout a user
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { 
  useUpdatePasswordMutation, 
  useLogoutUserMutation 
} = userApi;
