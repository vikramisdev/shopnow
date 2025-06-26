import { StarFilledIcon } from "@radix-ui/react-icons";

interface ReviewProps {
	userName: string;
	comment: string;
	rating: number;
}

const Review: React.FC<ReviewProps> = ({ userName, comment, rating }) => (
	<div className="bg-gray-100 p-4 rounded-md mb-3">
		<div className="flex items-center justify-between">
			<h2 className="font-semibold">{userName}</h2>
			<div className="flex">
				{[1, 2, 3, 4, 5].map((n) => (
					<StarFilledIcon
						key={n}
						className={
							n <= rating ? "text-yellow-500" : "text-gray-300"
						}
					/>
				))}
			</div>
		</div>
		<p className="mt-2 text-gray-700">{comment}</p>
	</div>
);
export default Review;
