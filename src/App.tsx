import FileComponent from "./components/file/FileComponent";
import { FileTree } from "./data/FileTree";
import { useAppSelector } from "./app/hooks";
import TabsBar from "./components/ui/TabsBar";
import FileContent from "@/components/ui/FileContent";
import { languageMap } from "./constants/index";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function App() {
	const activeTab = useAppSelector((state) => state.FileTree.activeTab);
	const tabs = useAppSelector((state) => state.FileTree.tabs);

	const getFileLanguage = (filename: string) => {
		const extension = filename.split(".").pop()?.toLowerCase() || "";
		return languageMap[extension];
	};

	return (
		<div className="h-screen bg-[#0D1117]">
			<PanelGroup direction="horizontal">
				{/* File Explorer Sidebar */}
				<Panel defaultSize={20} minSize={0} maxSize={30}>
					<div className="h-full flex flex-col border-r border-[#21262D]">
						<div className="p-3 uppercase text-xs font-semibold text-[#8B949E] bg-[#010409]">
							Explorer
						</div>
						<div className="overflow-y-auto flex-1 py-2 scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-[#1e1e1e] hover:scrollbar-thumb-[#4f4f4f]">
							{FileTree.map((file) => (
								<div key={file.id}>
									<FileComponent
										id={file.id}
										name={file.name}
										isFolder={file.isFolder}
										children={file.children}
										content={file.content}
									/>
								</div>
							))}
						</div>
					</div>
				</Panel>

				<PanelResizeHandle className="w-1 bg-[#1E2227] hover:bg-[#2B3038] transition-colors duration-150 cursor-col-resize" />

				{/* Main Editor Area */}
				<Panel>
					<div className="h-full flex flex-col bg-[#010409]">
						<TabsBar />
						<div className="flex-1 relative overflow-hidden">
							{tabs.length === 0 ? (
								<div className="absolute inset-0 flex items-center justify-center text-[#8B949E]">
									No files open
								</div>
							) : (
								<div className="h-full overflow-hidden">
									{activeTab && (
										<FileContent
											content={activeTab.content || ""}
											language={getFileLanguage(activeTab.name)}
										/>
									)}
								</div>
							)}
						</div>
					</div>
				</Panel>
			</PanelGroup>
		</div>
	);
}
