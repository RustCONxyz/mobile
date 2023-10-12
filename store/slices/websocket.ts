import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";

export const websocketSlice = createSlice({

    name: "websocket",

    initialState: {

        isConnected: false,

        isConnecting: false,

        failedToConnect: false

    },

    reducers: {

        setIsConnected: (state, action: PayloadAction<boolean>) => {

            state.isConnected = action.payload;

        },

        setIsConnecting: (state, action: PayloadAction<boolean>) => {

            state.isConnecting = action.payload;

        },

        setFailedToConnect: (state, action: PayloadAction<boolean>) => {

            state.failedToConnect = action.payload;

        }

    }

});

export const { setIsConnected, setIsConnecting, setFailedToConnect } = websocketSlice.actions;

export const selectIsConnected = (state: AppState) => state.websocket.isConnected;

export const selectIsConnecting = (state: AppState) => state.websocket.isConnecting;

export const selectFailedToConnect = (state: AppState) => state.websocket.failedToConnect;

export default websocketSlice.reducer;
