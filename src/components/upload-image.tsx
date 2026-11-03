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
	onImagesLoaded?: (imageUrls: Array<string>) => void;
	title?: string;
	description?: string;
	error?: string;
	/** Form field name (defaults to "image") */
	name?: string;
	/** When true, the form field receives an array of Files instead of a single File */
	multiple?: boolean;
	maxImages?: number;
	setValue: UseFormSetValue<any>;
	setError: UseFormSetError<any>;
	register: UseFormRegister<any>;
}
export const UploadImage = (props: UploadImageProps) => {
	const {
		defaultImages,
		error,
		setError,
		setValue,
		onImageLoaded,
		onImagesLoaded,
		name = "image",
		multiple = false,
		maxImages = 4,
	} = props;
	const capacity = multiple ? maxImages : 1;
	const [images, setImages] = useState<Array<string>>(defaultImages ?? []);
	const [files, setFiles] = useState<Array<File>>([]);

	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const selected = Array.from(e.target.files ?? []);
		e.target.value = "";

		const room = capacity - images.length;

		if (selected.length === 0 || room <= 0) {
			return;
		}

		try {
			const batch = selected.slice(0, room);
			const prepared = await Promise.all(
				batch.map((file) => prepareClientImage(file)),
			);

			const nextImages = [...images, ...prepared.map((i) => i.imageUrl)];
			const nextFiles = [...files, ...prepared.map((i) => i.compressedImage)];

			setImages(nextImages);
			setFiles(nextFiles);
			setValue(name, multiple ? nextFiles : nextFiles[0]);
			onImageLoaded?.(prepared[0].imageUrl);
			onImagesLoaded?.(nextImages);
		} catch (error) {
			setError(name, {
				message:
					error instanceof Error ? error.message : "Failed to process image",
			});
		}
	};

	const handleRemoveImage = (index: number) => {
		// Default images come first and have no File, so uploaded files are offset by
		// however many default images are still shown.
		const fileIndex = index - (images.length - files.length);
		const nextImages = images.filter((_, i) => i !== index);
		const nextFiles = files.filter((_, i) => i !== fileIndex);
		setImages(nextImages);
		setFiles(nextFiles);

		if (multiple) {
			setValue(name, nextFiles);
		} else {
			setValue(name, undefined);
		}

		onImagesLoaded?.(nextImages);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Upload className="h-5 w-5" />
					{props.title ?? "Photos"}
				</CardTitle>
				<CardDescription>
					{props.description ??
						(multiple
							? `Add up to ${capacity} photos (recommended: square format)`
							: "Add a photo (recommended: square format)")}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
					{images.map((image, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: images have no stable id and the same photo can be added twice
							key={index}
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
								aria-label="Remove image"
								className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 opacity-50 transition-opacity group-hover:opacity-100 z-50"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					))}

					{images.length < capacity && (
						<Button
							variant="ghost"
							className="flex aspect-square flex-col h-auto w-auto items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
						>
							<Upload className="h-6 w-6" />
							<span className="text-xs font-medium">Add Media</span>
							<input
								type="file"
								accept="image/*"
								multiple={multiple}
								name={name}
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
