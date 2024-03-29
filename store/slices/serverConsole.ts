import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@/store/store";
import ConsoleOutput from "@/types/ConsoleOutput";

export const serverConsoleSlice = createSlice({

    name: "serverConsole",

    initialState: [] as ConsoleOutput[],

    reducers: {

        setServerConsole: (state, action: PayloadAction<ConsoleOutput[]>) => {

            return action.payload;

        },

        addConsoleOutput: (state, action: PayloadAction<ConsoleOutput>) => {

            state.push(action.payload);

            if (state.length > 512) {

                state.shift();

            }

        }

    }

});

export const { setServerConsole, addConsoleOutput } = serverConsoleSlice.actions;

export const selectServerConsole = (state: AppState) => state.serverConsole;

export default serverConsoleSlice.reducer;
