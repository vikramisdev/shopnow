// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
	`Cloudinary configured with cloud name: ${process.env.CLOUDINARY_CLOUD_NAME}`
);

export async function uploadImageToCloudinary(
	fileBuffer: Buffer
): Promise<string> {
	return new Promise((resolve, reject) => {
		const upload = cloudinary.uploader.upload_stream(
			{
				folder: "user-profiles",
				resource_type: "image",
			},
			(err, result) => {
				if (err || !result) {
					console.error("Cloudinary upload error:", err);
					return reject("Image upload failed");
				}
				resolve(result.secure_url);
			}
		);
		upload.end(fileBuffer);
	});
}
