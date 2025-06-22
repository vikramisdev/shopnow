import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
	{
		_id: {
			type: Schema.Types.ObjectId,
			auto: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
