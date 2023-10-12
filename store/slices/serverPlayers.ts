import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";
import ServerPlayer from "../../interfaces/ServerPlayer";

export const serverPlayersSlice = createSlice({

    name: "serverPlayers",

    initialState: [] as ServerPlayer[],

    reducers: {

        setOnlinePlayers: (state, action: PayloadAction<ServerPlayer[]>) => {

            return action.payload;

        }

    }

});

export const { setOnlinePlayers } = serverPlayersSlice.actions;

export const selectOnlinePlayers = (state: AppState) => state.serverPlayers;

export default serverPlayersSlice.reducer;
