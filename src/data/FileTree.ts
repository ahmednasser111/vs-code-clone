import { File } from "../interfaces";
import { v4 as uuid } from "uuid";

export const FileTree: File[] = [
	{
		id: uuid(),
		name: "src",
		isFolder: true,
		children: [
			{
				id: uuid(),
				isFolder: true,
				name: "components",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "App.tsx",
						content: 'name: "App.tsx",',
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Header.tsx",
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Footer.tsx",
					},
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "styles",
				children: [
					{ id: uuid(), isFolder: false, name: "App.css" },
					{ id: uuid(), isFolder: false, name: "Header.css" },
					{ id: uuid(), isFolder: false, name: "Footer.css" },
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "hooks",
				children: [
					{ id: uuid(), isFolder: false, name: "useAuth.ts" },
					{ id: uuid(), isFolder: false, name: "useFetch.ts" },
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "utils",
				children: [
					{ id: uuid(), isFolder: false, name: "helpers.ts" },
					{ id: uuid(), isFolder: false, name: "constants.ts" },
				],
			},
			{ id: uuid(), isFolder: false, name: "index.tsx" },
			{ id: uuid(), isFolder: false, name: "App.tsx" },
		],
	},
	{
		id: uuid(),
		name: "public",
		isFolder: true,
		children: [
			{ id: uuid(), isFolder: false, name: "index.html" },
			{ id: uuid(), isFolder: false, name: "favicon.ico" },
			{ id: uuid(), isFolder: false, name: "logo.svg" },
		],
	},
	{
		id: uuid(),
		name: "node_modules",
		isFolder: true,
		children: [
			// This can be a mock of node_modules folder (can be left empty for now)
		],
	},
	{ id: uuid(), name: "package.json", isFolder: false },
	{ id: uuid(), name: "tsconfig.json", isFolder: false },
	{ id: uuid(), name: "package-lock.json", isFolder: false },
];
