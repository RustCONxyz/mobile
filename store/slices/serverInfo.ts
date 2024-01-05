import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@/store/store";
import ServerInfo from "@/types/ServerInfo";

export const serverInfoSlice = createSlice({

    name: "serverInfo",

    initialState: {

        hostname: "",

        players: 0,

        maxPlayers: 0,

        queued: 0,

        joining: 0,

        entityCount: 0,

        gameTime: "",

        uptime: 0,

        framerate: 0,

        memory: 0,

        collections: 0,

        networkIn: 0,

        networkOut: 0,

        restarting: false,

        saveCreatedTime: "",

        history: []

    } as ServerInfo,

    reducers: {

        setServerInfo: (state, action) => {

            state.hostname = action.payload.Hostname;

            state.players = action.payload.Players;

            state.maxPlayers = action.payload.MaxPlayers;

            state.queued = action.payload.Queued;

            state.joining = action.payload.Joining;

            state.entityCount = action.payload.EntityCount;

            state.gameTime = action.payload.GameTime;

            state.uptime = action.payload.Uptime;

            state.gameTime = action.payload.GameTime;

            state.framerate = action.payload.Framerate;

            state.memory = action.payload.Memory;

            state.collections = action.payload.Collections;

            state.networkIn = action.payload.NetworkIn;

            state.networkOut = action.payload.NetworkOut;

            state.restarting = action.payload.Restarting;

            const serverStats = {

                framerate: action.payload.Framerate,

                networkIn: action.payload.NetworkIn,

                networkOut: action.payload.NetworkOut,

                timestamp: Date.now()

            }

            // If the save created time has changed, or the last server stats are more than 10 seconds old, reset the history

            const lastServerStats = state.history[state.history.length - 1];

            if (state.saveCreatedTime !== action.payload.SaveCreatedTime || (lastServerStats && serverStats.timestamp - lastServerStats.timestamp > 10000)) {

                state.history = [serverStats];

            } else {

                state.history.push(serverStats);

                if (state.history.length > 60) {

                    state.history.shift();

                }

            }

            state.saveCreatedTime = action.payload.SaveCreatedTime;

        }

    }

});

export const { setServerInfo } = serverInfoSlice.actions;

export const selectServerInfo = (state: AppState) => state.serverInfo;

export default serverInfoSlice.reducer;
