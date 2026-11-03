import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import type * as React from "react";
import { useId } from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

interface InputFieldProps extends React.ComponentProps<"textarea"> {
	label: string;
	error: string | undefined | any;
}
function TextareaField({ className, error, label, ...props }: InputFieldProps) {
	const autoId = useId();
	const fieldId = props.id ?? autoId;
	const errorId = `${fieldId}-error`;
	return (
		<div className="space-y-2">
			<Label htmlFor={fieldId}>{label}</Label>
			<textarea
				id={fieldId}
				data-slot="textarea"
				aria-invalid={error ? true : undefined}
				aria-describedby={error ? errorId : undefined}
				className={cn(
					"border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				readOnly={props.disabled}
				{...props}
			/>
			{error ? (
				<p id={errorId} className="text-[0.8rem] font-medium text-destructive">
					{error}
				</p>
			) : null}
		</div>
	);
}

export { Textarea, TextareaField };
