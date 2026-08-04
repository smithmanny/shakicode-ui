import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface Options {
	quality?: number;
	width?: number;
	height?: number;
}
const DEFAULT_QUALITY = 0.75;
export function srcToWebP(
	src: string,
	{ quality, width, height }: Options = {},
): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d") as CanvasRenderingContext2D;

		const image = new Image();
		image.src = src;
		image.crossOrigin = "anonymous";
		image.onload = (e) => {
			canvas.width = width || image.width;
			canvas.height = height || image.height;
			// @ts-expect-error
			URL.revokeObjectURL(e.target.src);
			// @ts-expect-error
			context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(
				(data) => {
					resolve(data as Blob);
				},
				"image/webp",
				quality || DEFAULT_QUALITY,
			);
		};
		image.onerror = (e) => reject(e);
	});
}

export async function prepareClientImage(file: File): Promise<{
	compressedImage: File;
	imageUrl: string;
}> {
	const { default: imageCompression } = await import(
		"browser-image-compression"
	);

	return new Promise((resolve, reject) => {
		if (!file) {
			return reject(new Error("No file provided."));
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			srcToWebP(reader.result as string)
				.then((imageBlob) => {
					const options = {
						maxSizeMB: 1,
						maxWidthOrHeight: 1920,
						useWebWorker: true,
					};
					const fileName = file.name.split(".")[0];
					const convertedImage = new File([imageBlob], `${fileName}.webp`, {
						type: "image/webp",
					});

					imageCompression(convertedImage, options)
						.then((image) => {
							const compressedImage = new File([image], convertedImage.name, {
								type: "image/webp",
							});
							resolve({
								compressedImage,
								imageUrl: reader.result as string,
							});
						})
						.catch((error) => {
							reject(error);
						});
				})
				.catch((error) => {
					reject(error);
				});
		};
		reader.onerror = (error) => {
			reject(error);
		};
		reader.readAsDataURL(file);
	});
}
