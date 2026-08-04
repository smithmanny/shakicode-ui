"import client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type DefaultValues, type Resolver, useForm } from "react-hook-form";
import type * as z from "zod";
import type * as z4 from "zod/v4/core";

export function useTypedForm<T extends z4.$ZodObject>(
	formSchema: T,
	defaultValues: DefaultValues<z.output<typeof formSchema>>,
	values?: z.output<T> | undefined,
) {
	const form = useForm({
		resolver: zodResolver(formSchema) as Resolver<
			z.output<typeof formSchema>,
			any,
			z.output<typeof formSchema>
		>,
		defaultValues,
		values,
	});

	return form;
}
