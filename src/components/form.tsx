import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type FormErrorType = {
	error:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;
};
export const FormError = (props: FormErrorType) => {
	if (!props.error) return null;

	return (
		<p
			className="text-[0.8rem] font-medium text-destructive"
			aria-errormessage={props.error as string}
		>
			{props.error as string}
		</p>
	);
};
