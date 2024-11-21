import { closeTab } from "@/app/features/FileTreeSlice";
import { useAppDispatch } from "@/app/hooks";
import { X, ArrowLeftRight } from "lucide-react";
import { closeTabs } from "../../app/features/FileTreeSlice";

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
				dispatch(closeTabs("others"));
				break;
			case "closeAll":
				dispatch(closeTabs("all"));
				break;
			case "closeToTheRight":
				const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);
				tabs
					.slice(activeIndex + 1)
					.forEach((tab) => dispatch(closeTab(tab.id)));
				break;
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
