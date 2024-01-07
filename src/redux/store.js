import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './reducers/todosReducer'

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
})