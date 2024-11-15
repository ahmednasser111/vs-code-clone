import { FileIconPath } from "../../constants";

interface IProps {
	isFolder: boolean;
	name: string;
	isExpanded: boolean;
}
function RenderFileIcon({ isFolder, name, isExpanded }: IProps) {
	const extension = name.split(".").pop()?.toLowerCase() || "";
	const folderStatus = isFolder ? "folder" : "file";
	const ExpandStatus = isExpanded ? "-opened" : "";
	if (extension in FileIconPath)
		return (
			<img
				src={`/icons/vscode-icons_${folderStatus}-type-${FileIconPath[extension]}.svg`}
				alt={`${extension} icon`}
				className="w-5 h-5 mr-1"
			/>
		);
	return (
		<img
			src={`/icons/vscode-icons_default-${folderStatus}${ExpandStatus}.svg`}
			alt="icon"
			className="w-5 h-5 mr-1"
		/>
	);
}
export default RenderFileIcon;
