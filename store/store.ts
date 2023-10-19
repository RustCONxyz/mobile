import { configureStore } from "@reduxjs/toolkit";
import createWebSocketMiddleware from "@/store/websocket/middleware";
import { serverInfoSlice } from "@/store/slices/serverInfo";
import { serverConsoleSlice } from "@/store/slices/serverConsole";
import { serverMapSlice } from "@/store/slices/serverMap";
import { serverChatSlice } from "@/store/slices/serverChat";
import { serverPlayersSlice } from "@/store/slices/serverPlayers";
import { serverBansSlice } from "@/store/slices/serverBans";
import { websocketSlice } from "@/store/slices/websocket";

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
