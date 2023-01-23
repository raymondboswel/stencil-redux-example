import { Component, h, State, Watch } from '@stencil/core';
import { Subscription } from 'rxjs';
import { todosService } from '../../data/api/todos/todos.service';
import { userDetailsService } from '../../data/api/users/user-details.service';
import { $energyLevel, $getTodosResp, $getUserDetailsResp } from '../../data/store/selectors/selectors';
import { logEnergyLevel } from '../../data/store/state/todos.slice';
import { store } from '../../data/store/store';
import { EnergyLevel } from '../../data/types/energy-level';
import { Todo } from '../../data/types/todo';
import { UserDetails } from '../../data/types/user-details';


@Component({
  tag: 'app-todos',
  shadow: true,
})
export class AppTodos {
  @State() todos: Todo[];
  @State() userDetails: UserDetails;
  @State() energyLevel: EnergyLevel;

  todosSubscription: Subscription;
  userDetailsSubscription: Subscription;
  energyLevelSubscription: Subscription;
  todosReqUnsub: () => void;
  userDetailsUnsub: () => void;

  @Watch('energyLevel')
  initiateRequests() {
    this.todosReqUnsub?.();
    const req = todosService.initiateTodosRequest($energyLevel.value);
    this.todosReqUnsub = req.unsubscribe;

    const userDetailsReq = userDetailsService.initiateUserDetailsRequest();
    this.userDetailsUnsub = userDetailsReq.unsubscribe;
  }

  connectedCallback() {
    this.setupSubscriptions();
    this.initiateRequests();
  }

  disconnectedCallback() {
    this.disposeSubscriptions();
  }

  setupSubscriptions() {
    this.todosSubscription = $getTodosResp.subscribe(todosResp => {
      this.todos = todosResp?.data;
    });
    this.userDetailsSubscription = $getUserDetailsResp.subscribe(userDetailsResp => {
      this.userDetails = userDetailsResp?.data
    });
    this.energyLevelSubscription = $energyLevel.subscribe(energyLevel => {
      this.energyLevel = energyLevel;
    });
  }

  disposeSubscriptions() {
    this.todosSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
    this.energyLevelSubscription.unsubscribe();
    this.todosReqUnsub();
  }

  setEnergyLevel(energyLevel: EnergyLevel) {
    store.dispatch(logEnergyLevel(energyLevel));
    this.initiateRequests();
  }

  render() {
    return <article style={{ "display": "flex", "gap": "16px", "justify-content": "center", "flex-direction": "column", "align-items": "center" }}>
      <header style={{ "font-weight": "bold" }}>{this.userDetails?.name}'s RxJS Todo List</header>
      <section>
        {this.todos?.map(todo =>
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
