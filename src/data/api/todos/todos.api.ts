import { api } from "../api.slice";

export type GetTodosSelectorCreator = typeof todosApi.endpoints.getTodos.select;
export type GetTodosSelector = ReturnType<GetTodosSelectorCreator>;
export type GetTodosResponse = ReturnType<GetTodosSelector>;

export const todosArgsCache = {
  getTodos: undefined
}

export const todosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({
      query: ({ params }) => ({ url: 'todos', params }),
      providesTags: ["Todos"]

    }),
  }),
  overrideExisting: false
})
