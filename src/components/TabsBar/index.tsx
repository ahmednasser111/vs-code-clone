import { X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import RenderFileIcon from "@/components/RenderFileIcon";
import { closeTab, setActiveTab } from "@/app/features/FileTreeSlice";
import { useEffect, useRef, useState } from "react";
import DropMenu from "../DropMenu";

const TabsBar = () => {
	const tabs = useAppSelector((state) => state.FileTree.tabs);
	const activeTabId = useAppSelector((state) => state.FileTree.activeTab?.id);
	const dispatch = useAppDispatch();
	const [menuVisible, setMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
	const tabsRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (tabsRef.current && !tabsRef.current.contains(event.target)) {
				setMenuVisible(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	if (tabs.length === 0) {
		return <div className="h-10 bg-[#010409] border-b border-[#21262D]" />;
	}

	const handleTabClose = (e, tabId) => {
		e.stopPropagation();
		dispatch(closeTab(tabId));
	};

	const handleTabChange = (tabId) => {
		dispatch(setActiveTab(tabId));
	};

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setMenuVisible(true);
	};

	return (
		<div className="h-10 bg-[#010409] border-b border-[#21262D]" ref={tabsRef}>
			<Tabs
				value={activeTabId || undefined}
				onValueChange={handleTabChange}
				onContextMenu={handleContextMenu}
				className="w-full">
				<TabsList className="h-9 bg-transparent gap-0 justify-start w-full rounded-none">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.id}
							value={tab.id}
							className="relative group px-3 h-9 rounded-none border-r border-[#21262D] data-[state=active]:bg-[#0D1117] data-[state=active]:text-white text-[#8B949E] hover:bg-[#161B22]">
							<div className="flex items-center gap-2 pr-3">
								<span className="text-xs opacity-60">
									<RenderFileIcon
										isExpanded={false}
										isFolder={false}
										name={tab.name}
									/>
								</span>
								<span className="max-w-32 truncate text-sm">{tab.name}</span>
							</div>
							<button
								onClick={(e) => handleTabClose(e, tab.id)}
								className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:bg-[#21262D] rounded p-0.5">
								<X className="h-3 w-3" />
							</button>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
			{menuVisible && (
				<DropMenu
					onClose={() => setMenuVisible(false)}
					position={menuPosition}
					activeTabId={activeTabId}
					tabs={tabs}
				/>
			)}
		</div>
	);
};

export default TabsBar;
