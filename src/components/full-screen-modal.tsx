"use client";

import { Button } from "@workspace/ui/components/button";
import {
	DialogDescription,
	DialogFullPageContent,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import type { PropsWithChildren, ReactNode } from "react";

interface FullScreenModalProps extends PropsWithChildren {
	title: string;
	buttonText?: string;
	formId: string;
	actionButton?: ReactNode;
	description?: string;
	disabled?: boolean;
}
export function FullScreenModal(props: FullScreenModalProps) {
	return (
		<DialogFullPageContent
			aria-description={props.title}
			aria-describedby={props.title}
		>
			<DialogTitle />

			<span className="fixed right-4 top-4">
				<div className="flex space-x-4">
					{props.actionButton ?? props.actionButton}

					<Button form={props.formId} type="submit" disabled={props.disabled}>
						{props.buttonText || "Save changes"}
					</Button>
				</div>
			</span>

			<div className="mt-20 max-w-xl w-full mx-auto pb-20">
				<h1
					className={`${props.description ? "mb-3" : "mb-10"} text-xl font-semibold leading-none tracking-tight`}
				>
					{props.title}
				</h1>
				{props.description && (
					<DialogDescription className="mb-10 font-semibold text-red-500">
						{props.description}
					</DialogDescription>
				)}
				{props.children}
			</div>
		</DialogFullPageContent>
	);
}
