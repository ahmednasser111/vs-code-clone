import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface FileContentProps {
	content: string;
	language: string;
}

export default function FileContent({ content, language }: FileContentProps) {
	return (
		<div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-[#1e1e1e] hover:scrollbar-thumb-[#4f4f4f]">
			<SyntaxHighlighter
				language={language}
				style={vscDarkPlus}
				showLineNumbers={true}
				showInlineLineNumbers={true}
				customStyle={{
					margin: 0,
					padding: "1rem",
					backgroundColor: "transparent",
				}}>
				{content}
			</SyntaxHighlighter>
		</div>
	);
}
