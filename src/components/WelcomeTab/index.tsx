const WelcomeTab = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full bg-[#0D1117] text-[#8B949E] p-8">
			<div className="mb-8">
				<img src="/vscode-logo.png" alt="logo" />
			</div>
			<h1 className="text-2xl font-light mb-6 text-white">
				Welcome to VS Code
			</h1>
			<div className="max-w-md text-center">
				<p className="mb-4">Use the File Explorer on the left to open files</p>
			</div>
		</div>
	);
};

export default WelcomeTab;
