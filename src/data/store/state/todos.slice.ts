import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EnergyLevel } from '../../types/energy-level'

export interface TodosState {
  energyLevel: EnergyLevel
}

const initialState: TodosState = {
  energyLevel: 'great',
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    logEnergyLevel: (state, action: PayloadAction<EnergyLevel>) => {
      state.energyLevel = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { logEnergyLevel } = todosSlice.actions

export default todosSlice.reducer
