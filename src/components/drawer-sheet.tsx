"use client";

import { Button } from "@workspace/ui/components/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import type { PropsWithChildren } from "react";

interface DrawerSheetProps extends PropsWithChildren {
	title: string;
	header: string;
	description?: string;
}

export const DrawerSheet = (props: DrawerSheetProps) => {
	const isMobile = useIsMobile();

	return (
		<Drawer direction={isMobile ? "bottom" : "right"}>
			<DrawerTrigger asChild>
				<Button variant="link" className="text-foreground w-fit px-0 text-left">
					{props.header}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="gap-1">
					<DrawerTitle>{props.title}</DrawerTitle>
					<DrawerDescription>{props.description}</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
					{props.children}
				</div>
			</DrawerContent>
		</Drawer>
	);
};
