import { Component, h } from '@stencil/core';
import { todosService } from '../../data/api/todos/todos.service';
import { userDetailsService } from '../../data/api/users/user-details.service';
import { $$energyLevel, $$getTodosResp, $$getUserDetailsResp } from '../../data/store/selectors/stencil-store-selectors';
import { logEnergyLevel } from '../../data/store/state/todos.slice';
import { store } from '../../data/store/store';
import { EnergyLevel } from '../../data/types/energy-level';

@Component({
  tag: 'app-stencil-store-todos',
  shadow: true,
})
export class AppTodos {
  todosReqUnsub: () => void;
  userDetailsUnsub: () => void;

  initiateRequests() {
    this.todosReqUnsub?.();
    const req = todosService.initiateTodosRequest($$energyLevel.energyLevel);
    this.todosReqUnsub = req.unsubscribe;

    const userDetailsReq = userDetailsService.initiateUserDetailsRequest();
    this.userDetailsUnsub = userDetailsReq.unsubscribe;
  }

  connectedCallback() {
    this.initiateRequests();
  }

  disconnectedCallback() {
    this.disposeSubscriptions();
  }


  disposeSubscriptions() {
    this.todosReqUnsub();
    this.userDetailsUnsub();
  }

  setEnergyLevel(energyLevel: EnergyLevel) {
    store.dispatch(logEnergyLevel(energyLevel));
    this.initiateRequests();
  }

  render() {
    return <article style={{ "display": "flex", "gap": "16px", "justify-content": "center", "flex-direction": "column", "align-items": "center" }}>
      <header style={{ "font-weight": "bold" }}>{$$getUserDetailsResp.value?.data?.name}'s Stencil Store Todo List</header>
      <section>
        {$$getTodosResp.value.data?.map(todo =>
          <div>{todo.description}</div>
        )}
      </section>
      <section >
        <button onClick={() => this.setEnergyLevel('tired')}>Running low on energy</button>
        <button onClick={() => this.setEnergyLevel('great')}>I'm feeling great!</button>
      </section >
    </article >
  }
}
