// models/Order.ts

import mongoose, { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				productId: { type: Number, required: true }, // Match your `id` type
				title: String,
				price: Number,
				quantity: Number,
				image: String,
			},
		],
		totalAmount: Number,
		address: String,
		paymentMethod: {
			type: String,
			enum: ["creditCard", "upi", "cashOnDelivery"], // must match exactly
			required: true,
		},
		deliveryEstimate: {
			start: Date,
			end: Date,
		},
		status: {
			type: String,
			default: "pending",
		},
	},
	{ timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
