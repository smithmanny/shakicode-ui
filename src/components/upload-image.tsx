"use client";

import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Upload, X } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import type {
	UseFormRegister,
	UseFormSetError,
	UseFormSetValue,
} from "react-hook-form";
import { prepareClientImage } from "../lib/utils";

interface UploadImageProps {
	defaultImages?: Array<string>;
	onImageLoaded?: (imageUrl: string) => void;
	title?: string;
	description?: string;
	error: string | undefined;
	setValue: UseFormSetValue<any>;
	setError: UseFormSetError<any>;
	register: UseFormRegister<any>;
}
export const UploadImage = (props: UploadImageProps) => {
	const { defaultImages, error, setError, setValue, register, onImageLoaded } =
		props;
	const [images, setImages] = useState<Array<string>>(defaultImages ?? []);

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] as File;

		prepareClientImage(file)
			.then((i) => {
				setImages([...images, i.imageUrl]);
				// TODO: handle multiple images
				setValue("image", i.compressedImage);

				if (onImageLoaded) {
					return onImageLoaded(i.imageUrl);
				}
			})
			.catch((error) => setError("image", error));
	};

	const handleRemoveImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index));
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Upload className="h-5 w-5" />
					Photos
				</CardTitle>
				<CardDescription>
					Add up to 4 photos of your dish (recommended: square format)
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
					{images.map((image, index) => {
						const id = Date.now();

						return (
							<div
								key={id}
								className="group relative aspect-square overflow-hidden rounded-lg border"
							>
								<img
									src={image || "/placeholder.svg"}
									alt={`Upload asset ${index + 1}`}
									className="object-cover w-full h-full"
								/>
								<Button
									onClick={() => handleRemoveImage(index)}
									variant="ghost"
									className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 opacity-50 transition-opacity group-hover:opacity-100 z-50"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						);
					})}

					{images.length < 4 && (
						<Button
							variant="ghost"
							className="flex aspect-square flex-col h-auto w-auto items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
						>
							<Upload className="h-6 w-6" />
							<span className="text-xs font-medium">Add Media</span>
							<input
								type="file"
								accept="image/*"
								{...register("image")}
								className="absolute inset-0 opacity-0 cursor-pointer"
								onChange={handleImageUpload}
							/>
						</Button>
					)}
				</div>
				{error && (
					<p className="text-[0.8rem] font-medium text-destructive">{error}</p>
				)}
			</CardContent>
		</Card>
	);
};
