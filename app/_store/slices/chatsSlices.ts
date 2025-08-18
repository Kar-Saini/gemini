import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chats } from "@/app/_utils/type";
type ChatsState = {
  chats: Chats[];
  selectedChatId: string;
};
const initialState: ChatsState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chats>) => {
      state.chats.push(action.payload);
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
  },
});

export const { addChat, deleteChat } = chatsSlice.actions;
export default chatsSlice.reducer;
