import React from "react";
import { apiSlice } from "./apiSlice";

const USERS_URL = "/api";

export const registrantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        // url: "http://localhost:5000/registrant/auth",
        url: `${USERS_URL}/registrant/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = registrantApiSlice;
