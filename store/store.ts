import { configureStore } from "@reduxjs/toolkit";
import createWebSocketMiddleware from "./websocket/middleware";
import { serverInfoSlice } from "./slices/serverInfo";
import { serverConsoleSlice } from "./slices/serverConsole";
import { serverMapSlice } from "./slices/serverMap";
import { serverChatSlice } from "./slices/serverChat";
import { serverPlayersSlice } from "./slices/serverPlayers";
import { serverBansSlice } from "./slices/serverBans";
import { websocketSlice } from "./slices/websocket";

const store = configureStore({

    reducer: {

        [websocketSlice.name]: websocketSlice.reducer,

        [serverInfoSlice.name]: serverInfoSlice.reducer,

        [serverConsoleSlice.name]: serverConsoleSlice.reducer,

        [serverMapSlice.name]: serverMapSlice.reducer,

        [serverChatSlice.name]: serverChatSlice.reducer,

        [serverPlayersSlice.name]: serverPlayersSlice.reducer,

        [serverBansSlice.name]: serverBansSlice.reducer

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createWebSocketMiddleware())

});

export type AppStore = typeof store;

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export default store;
