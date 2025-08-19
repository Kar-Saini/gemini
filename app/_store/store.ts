import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatsSlices";
const appStore = configureStore({
  reducer: {
    chats: chatReducer,
  },
});

export default appStore;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
