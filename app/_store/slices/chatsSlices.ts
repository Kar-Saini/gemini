import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chats } from "@/app/_utils/type";
type ChatsState = {
  chats: Chats[];
  selectedChatId: string;
  username: string;
};
const initialState: ChatsState = {
  chats: [],
  selectedChatId: "",
  username: "",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chats>) => {
      state.chats.push(action.payload);
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat?.id !== action.payload);
      state.selectedChatId = "";
    },
    selectChatId: (state, action: PayloadAction<string>) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const { addChat, deleteChat, selectChatId } = chatsSlice.actions;
export default chatsSlice.reducer;
