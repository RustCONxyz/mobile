import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@/store/store";
import ChatMessage from "@/interfaces/ChatMessage";

export const serverChatSlice = createSlice({

    name: "serverChat",

    initialState: [] as ChatMessage[],

    reducers: {

        setServerChat: (state, action: PayloadAction<ChatMessage[]>) => {

            return action.payload;

        },

        addServerChatMessage: (state, action: PayloadAction<ChatMessage>) => {

            state.push(action.payload);

            if (state.length > 512) {

                state.shift();

            }

        }

    }

});

export const { addServerChatMessage, setServerChat } = serverChatSlice.actions;

export const selectServerChat = (state: AppState) => state.serverChat;

export default serverChatSlice.reducer;
