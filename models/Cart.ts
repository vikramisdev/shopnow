import { Schema, model, models } from "mongoose";

const cartItemSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		productId: {
			type: Number, // DummyJSON product ID
			required: true,
		},
		title: String,
		price: Number,
		thumbnail: String,
		category: String,
		quantity: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true }
);

const CartItem = models.CartItem || model("CartItem", cartItemSchema);
export default CartItem;
