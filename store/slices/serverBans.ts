import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@/store/store";
import ServerBan from "@/interfaces/ServerBan";

export const serverBansSlice = createSlice({

    name: "serverBans",

    initialState: [] as ServerBan[],

    reducers: {

        setServerBans: (state, action: PayloadAction<ServerBan[]>) => {

            return action.payload;

        }

    }

});

export const { setServerBans } = serverBansSlice.actions;

export const selectServerBans = (state: AppState) => state.serverBans;

export default serverBansSlice.reducer;
