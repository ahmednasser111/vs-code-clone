import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface IProps {
	content: string;
	language: string;
}
const FileContent = ({ content, language }: IProps) => {
	// For text files without specific language highlighting
	if (!language) {
		return (
			<div className="p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap">
				{content}
			</div>
		);
	}

	// For code files with syntax highlighting
	return (
		<div className="h-full overflow-auto bg-[#0D1117]">
			<SyntaxHighlighter
				language={language}
				style={vscDarkPlus}
				customStyle={{
					margin: 0,
					padding: "1rem",
					background: "#0D1117",
					fontSize: "0.875rem",
					lineHeight: "1.5",
				}}
				showLineNumbers={true}
				lineNumberStyle={{
					minWidth: "3em",
					paddingRight: "1em",
					color: "#484f58",
					textAlign: "right",
				}}>
				{content}
			</SyntaxHighlighter>
		</div>
	);
};

export default FileContent;
