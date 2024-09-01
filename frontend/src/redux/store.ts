/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";

import { postApi } from "./api/postApi";
import { queryApi } from "./api/queryApi";

export const store = configureStore({
  reducer: {
    [queryApi.reducerPath]: queryApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      queryApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;