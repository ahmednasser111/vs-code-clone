interface Point {
	x: number;
	y: number;
}
interface IProps {
	position: Point;
	onClose: (b: boolean) => void;
}

const DropMenu = ({ position, onClose }: IProps) => {
	return (
		<div
			className="absolute bg-white border shadow-md rounded-md"
			style={{ top: position.y, left: position.x }}>
			<ul>
				<li className="p-2 cursor-pointer hover:bg-gray-100">Close</li>
			</ul>
		</div>
	);
};

export default DropMenu;
