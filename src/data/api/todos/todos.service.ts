import { store } from "../../store/store";
import { EnergyLevel } from "../../types/energy-level";
import { todosApi, todosArgsCache } from "./todos.api";

export class TodosService {
  private getTodos = todosApi.endpoints.getTodos.initiate;

  constructor() { }

  initiateTodosRequest(energyLevel: EnergyLevel) {
    const args = { params: { energyLevel: energyLevel } };
    todosArgsCache.getTodos = args;
    console.log("TodosArgsCache");

    return store.dispatch(this.getTodos(args));
  }
}
export const todosService = new TodosService();
