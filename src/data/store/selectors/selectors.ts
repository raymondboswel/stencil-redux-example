import { createSelector } from '@reduxjs/toolkit';
import { GetTodosResponse } from '../../api/todos/todos.api';
import { getTodosSelector } from '../../api/todos/todos.selectors';
import { GetUserDetailsResponse } from '../../api/users/users.api';
import { getUserDetailsSelector } from '../../api/users/users.selectors';
import { EnergyLevel } from '../../types/energy-level';
import { RootState, store } from '../store';
import { createReactiveSelector } from './reactive-selector';

const selectSelf = (state: RootState) => state.todos;
export const selectEnergyLevel = createSelector(
  selectSelf,
  state => state.energyLevel
);

export const $energyLevel = createReactiveSelector<EnergyLevel>();
export const $getTodosResp = createReactiveSelector<GetTodosResponse>();
export const $getUserDetailsResp = createReactiveSelector<GetUserDetailsResponse>();

store.subscribe(() => {
  const state = store.getState();

  const getTodosResp = getTodosSelector()(state);
  console.log("GET TODOS RESP", getTodosResp);

  $getTodosResp.subject.next(getTodosResp);

  const getUserDetailsResp = getUserDetailsSelector()(state);
  $getUserDetailsResp.subject.next(getUserDetailsResp);

  const energyLevel = selectEnergyLevel(state)
  $energyLevel.subject.next(energyLevel);
});
