import { configureStore } from "@reduxjs/toolkit";
import FileTreeReducer from "./features/FileTreeSlice";

export const store = configureStore({
	reducer: {
		FileTree: FileTreeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
