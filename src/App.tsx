import FileComponent from "./components/file/FileComponent";
import { FileTree } from "./data/FileTree";
import { useAppSelector } from "./app/hooks";

interface IProps {}

function App({}: IProps) {
	return (
		<div className="min-h-screen bg-black p-6">
			<div className="bg-slate-950  p-6 shadow-md rounded-md">
				<h1 className="text-2xl font-semibold text-white mb-4">
					File Explorer
				</h1>
				<p className="text-white">
					no. files opened ={" "}
					{useAppSelector((state) => state.FileTree.tabs.length)}
				</p>
				{/* Map through FileTree to render FileComponents */}
				{FileTree.map((file) => (
					<div key={file.id} className="mb-2">
						<FileComponent
							id={file.id}
							name={file.name}
							isFolder={file.isFolder}
							children={file.children}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
