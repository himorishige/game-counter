import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { counterApi } from '../services/counter';

export const store = configureStore({
  reducer: {
    [counterApi.reducerPath]: counterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(counterApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
