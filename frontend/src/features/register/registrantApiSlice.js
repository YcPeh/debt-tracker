import React from "react";
import { apiSlice } from "./apiSlice";

export const registrantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "http://localhost:5000/registrant/auth",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = registrantApiSlice;
