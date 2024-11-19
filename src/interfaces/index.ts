export interface File {
	id: string;
	name: string;
	isFolder: boolean;
	children?: File[];
	content?: string;
}
export interface FileTab extends File {
	lastVisitedTime: number;
}
