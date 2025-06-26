import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
	productId: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // This refers to your User model
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
