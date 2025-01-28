import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["chat"],
  endpoints: (builder) => ({
    // Fetch all groups
    getChatList: builder.query({
      query: () => ({
        url: "/group",
        method: "GET",
      }),
    }),

    // Fetch messages for a specific group
    getGroupMessage: builder.query({
      query: (groupId) => ({
        url: `/group/messages/${groupId}`,
        method: "GET",
      }),
    }),

    // Send a message in a group
    sendMessage: builder.mutation({
      query: ({ groupId, content }) => ({
        url: `/group/message/send/${groupId}`,
        method: "POST",
        body: { content },
      }),
    }),

    // Create a new group
    createGroup: builder.mutation({
      query: ({ name, description }) => ({
        url: "/group/create",
        method: "POST",
        body: { name, description },
      }),
    }),

    // Send an invite link to a group
    sendInvite: builder.mutation({
      query: ({ groupId, email }) => ({
        url: `/group/send-invite/${groupId}`,
        method: "POST",
        body: { email },
      }),
    }),

    // Accept a group invite
    acceptInvite: builder.mutation({
      query: (inviteId) => ({
        url: `/group/accept/${inviteId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetChatListQuery,
  useGetGroupMessageQuery,
  useSendMessageMutation,
  useCreateGroupMutation,
  useSendInviteMutation,
  useAcceptInviteMutation,
} = chatApi;
