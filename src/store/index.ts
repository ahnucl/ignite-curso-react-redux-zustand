import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer café', 'Estudar Redux', 'Estudar Zustand'],

  reducers: {
    add: (state, action) => {
      state.push(action.payload.newTodo)
    }
  }
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  }
})

export const { add } = todoSlice.actions

export type RootState = ReturnType<typeof store.getState> // Pegar tipo do retorno de uma função
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector