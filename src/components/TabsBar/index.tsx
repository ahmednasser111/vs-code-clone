import React, { useEffect, useRef, useState, useMemo } from "react";
import { X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import RenderFileIcon from "@/components/RenderFileIcon";
import {
	closeTab,
	setActiveTab,
	reorderTabs,
} from "@/app/features/FileTreeSlice";
import DropMenu from "../DropMenu";
import { FileTab } from "../../interfaces/index";

const TabsBar: React.FC = () => {
	const tabs = useAppSelector((state) => state.FileTree.tabs);
	const activeTabId = useAppSelector((state) => state.FileTree.activeTab?.id);
	const dispatch = useAppDispatch();
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const tabsRef = useRef<HTMLDivElement | null>(null);
	const [draggedTabIndex, setDraggedTabIndex] = useState<number | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tabsRef.current && !tabsRef.current.contains(event.target as Node)) {
				setMenuVisible(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const handleTabClose = (
		e: React.MouseEvent<HTMLButtonElement>,
		tabId: string
	) => {
		e.stopPropagation();
		dispatch(closeTab(tabId));
	};

	const handleTabChange = (tabId: string) => {
		dispatch(setActiveTab(tabId));
	};

	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setMenuVisible(true);
	};

	const handleDragStart = (
		e: React.DragEvent<HTMLButtonElement>,
		index: number
	) => {
		setDraggedTabIndex(index);
		e.dataTransfer?.setData("text/plain", index.toString());
	};

	const handleDragOver = (
		e: React.DragEvent<HTMLButtonElement>,
		index: number
	) => {
		e.preventDefault();
		if (draggedTabIndex === null || draggedTabIndex === index) return;
	};

	const handleDrop = (
		e: React.DragEvent<HTMLButtonElement>,
		dropIndex: number
	) => {
		e.preventDefault();
		if (draggedTabIndex === null || draggedTabIndex === dropIndex) return;

		dispatch(
			reorderTabs({
				fromIndex: draggedTabIndex,
				toIndex: dropIndex,
			})
		);

		setDraggedTabIndex(null);
	};

	const renderedTabs = useMemo(() => {
		return tabs.map((tab: FileTab, index: number) => (
			<TabsTrigger
				key={tab.id}
				value={tab.id}
				draggable
				onDragStart={(e) => handleDragStart(e, index)}
				onDragOver={(e) => handleDragOver(e, index)}
				onDrop={(e) => handleDrop(e, index)}
				className="relative group px-3 h-9 rounded-none border-r border-[#21262D] data-[state=active]:bg-[#0D1117] data-[state=active]:text-white text-[#8B949E] hover:bg-[#161B22]">
				<div className="flex items-center gap-2 pr-4">
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
					<X className="h-3 w-4" />
				</button>
			</TabsTrigger>
		));
	}, [tabs, draggedTabIndex]);

	if (tabs.length === 0) {
		return <div className="h-10 bg-[#010409] border-b border-[#21262D]" />;
	}

	return (
		<div className="h-10 bg-[#010409] border-b border-[#21262D]" ref={tabsRef}>
			<Tabs
				value={activeTabId || undefined}
				onValueChange={handleTabChange}
				className="w-full">
				<TabsList
					className="h-9 bg-transparent gap-0 justify-start w-full rounded-none"
					onContextMenu={handleContextMenu}>
					{renderedTabs}
				</TabsList>
			</Tabs>
			{menuVisible && (
				<DropMenu
					onClose={() => setMenuVisible(false)}
					position={menuPosition}
					activeTabId={activeTabId || ""}
					tabs={tabs}
				/>
			)}
		</div>
	);
};

export default TabsBar;
