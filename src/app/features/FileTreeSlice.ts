import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { File, FileTab } from "../../interfaces";

export interface FileTreeState {
	tabs: FileTab[];
	activeTab: FileTab | null;
}

const initialState: FileTreeState = {
	tabs: [],
	activeTab: null,
};

export const FileTreeSlice = createSlice({
	name: "fileTree",
	initialState,
	reducers: {
		openTab: (state, action: PayloadAction<File>) => {
			const now = Date.now();

			const isExists = state.tabs.findIndex(
				(tab) => tab.id === action.payload.id
			);
			if (isExists !== -1)
				state.tabs[isExists] = { ...action.payload, lastVisitedTime: now };
			else state.tabs.push({ ...action.payload, lastVisitedTime: now });

			// Set as active tab
			state.activeTab = { ...action.payload, lastVisitedTime: now };
		},

		closeTab: (state, action: PayloadAction<string>) => {
			state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);

			if (state.activeTab?.id === action.payload) {
				const mostRecentVisitedTab = state.tabs.reduce(
					(maxTab, tab) =>
						tab.lastVisitedTime > maxTab.lastVisitedTime ? tab : maxTab,
					state.tabs[0]
				);

				state.activeTab = state.tabs.length > 0 ? mostRecentVisitedTab : null;
			}
		},

		setActiveTab: (state, action: PayloadAction<string>) => {
			const now = Date.now();
			const tabIndex = state.tabs.findIndex((tab) => tab.id === action.payload);
			if (tabIndex !== -1) {
				state.tabs[tabIndex] = {
					...state.tabs[tabIndex],
					lastVisitedTime: now,
				};
				state.activeTab = state.tabs[tabIndex];
			}
		},

		closeTabs: (
			state,
			action: PayloadAction<"all" | "others" | "right" | "left">
		) => {
			const currentTabIndex = state.activeTab
				? state.tabs.findIndex((tab) => tab.id === state.activeTab?.id)
				: -1;

			switch (action.payload) {
				case "all":
					state.tabs = [];
					state.activeTab = null;
					break;

				case "others":
					if (state.activeTab) {
						state.tabs = [state.activeTab];
					}
					break;

				case "right":
					if (currentTabIndex !== -1) {
						state.tabs = state.tabs.slice(0, currentTabIndex + 1);
					}
					break;

				case "left":
					if (currentTabIndex !== -1) {
						state.tabs = state.tabs.slice(currentTabIndex);
					}
					break;
			}
		},

		reorderTabs: (
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
			const { fromIndex, toIndex } = action.payload;
			const [movedTab] = state.tabs.splice(fromIndex, 1);
			state.tabs.splice(toIndex, 0, movedTab);
		},
	},
});

export const { openTab, closeTab, setActiveTab, closeTabs, reorderTabs } =
	FileTreeSlice.actions;

// Selectors
export const selectTabs = (state: { FileTree: FileTreeState }) =>
	state.FileTree.tabs;
export const selectActiveTab = (state: { FileTree: FileTreeState }) =>
	state.FileTree.activeTab;
// selectActiveFile selector is no longer needed since activeTab is now the File itself

export default FileTreeSlice.reducer;
