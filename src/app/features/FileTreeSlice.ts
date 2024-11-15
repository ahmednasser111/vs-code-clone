import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { File } from "../../interfaces";

export interface FileTreeState {
	tabs: File[];
	openedFile: Partial<File>;
}

const initialState: FileTreeState = {
	tabs: [],
	openedFile: {},
};

export const FileTreeSlice = createSlice({
	name: "fileTree",
	initialState,
	reducers: {
		open: (state, action: PayloadAction<File>) => {
			state.openedFile = action.payload;
			if (state.tabs.find((tab) => tab.id === action.payload.id)) {
				alert("exists!");
				return;
			}
			state.tabs.push(action.payload);
		},
		// decrement: (state) => {
		// 	state.value -= 1;
		// },
		// // Use the PayloadAction type to declare the contents of `action.payload`
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload;
		// },
	},
});

export const { open } = FileTreeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default FileTreeSlice.reducer;
