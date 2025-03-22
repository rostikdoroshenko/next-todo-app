import { configureStore } from "@reduxjs/toolkit";
import todoSlice, { todosInitState } from "@/store/todo-slice";

//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;

export const createStore = (isAuth: boolean) => {
  return configureStore({
    reducer: todoSlice.reducer,
    preloadedState: {
      ...todosInitState,
      isAuth,
    },
  });
};
