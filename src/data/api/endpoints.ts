import { todosApi } from "./todos/todos.api";
import { usersApi } from "./users/users.api";
// This helps to add some type safety to our getMemoizedSelector function
export type Endpoints = typeof todosApi.endpoints & typeof usersApi.endpoints;
