import { closeTab } from "@/app/features/FileTreeSlice";
import { useAppDispatch } from "@/app/hooks";
import {
	X,
	Copy,
	Maximize2,
	MinusSquare,
	ArrowLeftRight,
	FolderOpen,
	RefreshCw,
	Lock,
} from "lucide-react";

interface Props {
	onClose: () => void;
	position: { x: number; y: number };
	activeTabId: string;
	tabs: { id: string; name: string }[];
}

const DropMenu: React.FC<Props> = ({
	onClose,
	position,
	activeTabId,
	tabs,
}) => {
	const dispatch = useAppDispatch();

	const handleAction = (action: string) => {
		switch (action) {
			case "close":
				dispatch(closeTab(activeTabId));
				break;
			case "closeOthers":
				tabs.forEach((tab) => {
					if (tab.id !== activeTabId) {
						dispatch(closeTab(tab.id));
					}
				});
				break;
			case "closeAll":
				tabs.forEach((tab) => dispatch(closeTab(tab.id)));
				break;
			case "closeToTheRight":
				const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);
				tabs
					.slice(activeIndex + 1)
					.forEach((tab) => dispatch(closeTab(tab.id)));
				break;
			// Implement other actions as needed
			case "closeSaved":
				console.log("closeSaved");
				break;
			case "keepOpen":
				console.log("keepOpen");
				break;
			case "copyPath":
				console.log("copyPath");
				break;
			case "revealInFileExplorer":
				console.log("revealInFileExplorer");
				break;
			case "reopenClosedEditor":
				console.log("reopenClosedEditor");
				break;
			case "splitEditor":
				console.log("splitEditor");
				break;
			default:
				console.log(`Action: ${action}`);
		}
		onClose();
	};

	return (
		<div
			className="fixed w-64 bg-[#1E1E1E] text-[#CCCCCC] border border-[#454545] shadow-lg rounded-md z-50"
			style={{ top: position.y, left: position.x }}>
			<ul>
				<MenuItem
					icon={<X />}
					label="Close"
					onClick={() => handleAction("close")}
				/>
				<MenuItem
					icon={<X />}
					label="Close Others"
					onClick={() => handleAction("closeOthers")}
				/>
				<MenuItem
					icon={<X />}
					label="Close All"
					onClick={() => handleAction("closeAll")}
				/>
				<Separator />
				<MenuItem
					icon={<ArrowLeftRight />}
					label="Close to the Right"
					onClick={() => handleAction("closeToTheRight")}
				/>
				<MenuItem
					icon={<MinusSquare />}
					label="Close Saved"
					onClick={() => handleAction("closeSaved")}
				/>
				<Separator />
				<MenuItem
					icon={<Lock />}
					label="Keep Open"
					onClick={() => handleAction("keepOpen")}
				/>
				<Separator />
				<MenuItem
					icon={<Copy />}
					label="Copy Path"
					onClick={() => handleAction("copyPath")}
				/>
				<MenuItem
					icon={<FolderOpen />}
					label="Reveal in File Explorer"
					onClick={() => handleAction("revealInFileExplorer")}
				/>
				<Separator />
				<MenuItem
					icon={<RefreshCw />}
					label="Reopen Closed Editor"
					onClick={() => handleAction("reopenClosedEditor")}
				/>
				<MenuItem
					icon={<Maximize2 />}
					label="Split Editor"
					onClick={() => handleAction("splitEditor")}
				/>
			</ul>
		</div>
	);
};

const MenuItem: React.FC<{
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}> = ({ icon, label, onClick }) => (
	<li
		className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#094771]"
		onClick={onClick}>
		<span className="mr-2">{icon}</span>
		<span>{label}</span>
	</li>
);

const Separator: React.FC = () => (
	<li className="border-t border-[#454545] my-1" />
);

export default DropMenu;
