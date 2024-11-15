import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { File } from "../../interfaces";
import { useState } from "react";
import RenderFileIcon from "../renderFileIcon/RenderFileIcon";
import { useAppDispatch } from "../../app/hooks";
import { open } from "../../app/features/FileTreeSlice";

function FileComponent(file: File) {
	const dispatch = useAppDispatch();
	const { name, children, isFolder } = file;
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const toggle = () => {
		setIsExpanded((prev) => !prev);
	};

	const openFile = () => dispatch(open(file));

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			isFolder ? toggle() : openFile();
		}
		if (event.key === "ArrowRight" && isFolder && !isExpanded) {
			setIsExpanded(true);
		}
		if (event.key === "ArrowLeft" && isFolder && isExpanded) {
			setIsExpanded(false);
		}
	};

	return (
		<div className="ml-4">
			<div
				className="flex items-center mb-1 hover:bg-slate-600 transition duration-200 rounded-md p-1 cursor-pointer"
				onClick={isFolder ? toggle : openFile}
				onKeyDown={handleKeyDown}
				tabIndex={0}>
				{children &&
					(isExpanded ? (
						<ChevronDownIcon width={20} color="white" />
					) : (
						<ChevronRightIcon width={20} color="white" />
					))}
				{/* Folder or file icon */}
				<RenderFileIcon
					isExpanded={isExpanded}
					isFolder={isFolder}
					name={name}
				/>
				{/* File name */}
				<span className="font-semibold text-white">{name}</span>
			</div>
			{isExpanded && children && children.length > 0 && (
				<div className="ml-4 border-l border-gray-300 pl-4">
					{children.map((child) => (
						<FileComponent
							key={child.id}
							id={child.id}
							name={child.name}
							isFolder={child.isFolder}
							children={child.children}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default FileComponent;
