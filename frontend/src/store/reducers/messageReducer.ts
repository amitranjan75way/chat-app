
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
  };
  content: string;
  createdAt: string;
  group: string;
}

interface ChatState {
  selectedGroupId: string | null;
  messages: Message[];
}

const initialState: ChatState = {
  selectedGroupId: null,
  messages: [],
};

const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSelectedGroupId(state, action: PayloadAction<string | null>) {
      state.selectedGroupId = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { setSelectedGroupId, setMessages, addMessage } = messageReducer.actions;
export default messageReducer.reducer;
