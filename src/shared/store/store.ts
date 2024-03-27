import { configureStore } from "@reduxjs/toolkit";
import widgetsSlice from "@/pages/Home/widgetsSlice.ts";

export const store = configureStore({
  reducer: {
    widgets: widgetsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
