import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";
import ServerMap from "../../interfaces/ServerMap";

export const serverMapSlice = createSlice({

    name: "serverMap",

    initialState: {

        type: "Unknown",

        seed: 0,

        size: 0

    } as ServerMap,

    reducers: {

        setServerMapType: (state, action: PayloadAction<ServerMap["type"]>) => {

            state.type = action.payload;

        },

        setServerMapSeed: (state, action: PayloadAction<number>) => {

            state.seed = action.payload;

        },

        setServerMapSize: (state, action: PayloadAction<number>) => {

            state.size = action.payload;

        }

    }

});

export const { setServerMapType, setServerMapSeed, setServerMapSize } = serverMapSlice.actions;

export const selectServerMap = (state: AppState) => state.serverMap;

export default serverMapSlice.reducer;
