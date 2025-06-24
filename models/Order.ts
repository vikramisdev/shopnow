import { Schema, model, models, Types } from "mongoose";

const productSchema = new Schema(
	{
		productId: { type: Number, required: true }, // If from external DB or static data
		title: { type: String, required: true },
		price: { type: Number, required: true, min: 0 },
		quantity: { type: Number, required: true, min: 1 },
		image: { type: String },
	},
	{ _id: false } // Prevents automatic _id for subdocuments
);

const orderSchema = new Schema(
	{
		userId: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: {
			type: [productSchema],
			required: true,
			validate: [
				(val: unknown[]) => val.length > 0,
				"At least one product required",
			],
		},
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		paymentMethod: {
			type: String,
			enum: ["creditCard", "upi", "cashOnDelivery"],
			required: true,
		},
		deliveryEstimate: {
			start: { type: Date, required: true },
			end: { type: Date, required: true },
		},
		status: {
			type: String,
			enum: ["pending", "shipped", "delivered", "cancelled"],
			default: "pending",
			lowercase: true,
		},
	},
	{ timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
