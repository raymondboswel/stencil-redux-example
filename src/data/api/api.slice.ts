import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ["Todos", "UserDetails"],
  endpoints: () => ({}),

})
