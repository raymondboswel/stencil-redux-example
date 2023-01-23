import { api } from "../api.slice";

export type GetUserDetailsSelectorCreator = typeof usersApi.endpoints.getUserDetails.select;
export type GetUserDetailsSelector = ReturnType<GetUserDetailsSelectorCreator>;
export type GetUserDetailsResponse = ReturnType<GetUserDetailsSelector>;


export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({ url: 'user-details' }),
      providesTags: ["UserDetails"]
    }),
  }),
  overrideExisting: false,
})
