import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
	productId: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
