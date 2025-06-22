import { Schema, model, models } from "mongoose";

const favoriteSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		productId: {
			type: Number,
			required: true,
		},
		title: String,
		price: Number,
		thumbnail: String,
		category: String,
	},
	{ timestamps: true }
);

const Favorite = models.Favorite || model("Favorite", favoriteSchema);
export default Favorite;
