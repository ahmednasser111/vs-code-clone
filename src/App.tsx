import FileComponent from "./components/file/FileComponent";
import { FileTree } from "./data/FileTree";
import { useAppSelector } from "./app/hooks";
import TabsBar from "./components/ui/TabsBar";
import FileContent from "@/components/ui/FileContent";
import { languageMap } from "./constants/index";

function App() {
	const activeTab = useAppSelector((state) => state.FileTree.activeTab);
	const tabs = useAppSelector((state) => state.FileTree.tabs);

	// Helper function to determine file language based on extension
	const getFileLanguage = (filename: string) => {
		const extension = filename.split(".").pop()?.toLowerCase();
		return languageMap[extension || ""] || "";
	};

	return (
		<div className="h-screen flex bg-[#0D1117]">
			{/* File Explorer Sidebar */}
			<div className="w-64 flex flex-col border-r border-[#21262D] flex-shrink-0">
				<div className="p-3 uppercase text-xs font-semibold text-[#8B949E]">
					Explorer
				</div>
				<div className="overflow-y-auto flex-1 py-2">
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

			{/* Main Editor Area */}
			<div className="flex-1 flex flex-col bg-[#010409]">
				<TabsBar />
				<div className="flex-1 relative">
					{tabs.length === 0 ? (
						<div className="absolute inset-0 flex items-center justify-center text-[#8B949E]">
							No files open
						</div>
					) : (
						<div className="h-full">
							{activeTab && (
								<FileContent
									content={activeTab.content}
									language={getFileLanguage(activeTab.name)}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
