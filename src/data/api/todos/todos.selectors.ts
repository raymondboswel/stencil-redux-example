import { getMemoizedSelector } from "../get-memoized-selector";
import { todosApi, GetTodosSelector, GetTodosSelectorCreator, todosArgsCache } from "./todos.api";

export function getTodosSelector() {
  return getMemoizedSelector<GetTodosSelector, GetTodosSelectorCreator>(
    // This is set when initiating the call to the endpoint, 
    // and reflects the latest args the endpoint was called with
    todosArgsCache.getTodos,
    "getTodos",
    todosApi.endpoints.getTodos.select);
}


