"use client";

import { Button } from "@workspace/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { Separator } from "@workspace/ui/components/separator";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { X } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

interface DrawerSheetProps extends PropsWithChildren {
	title: string;
	header: string;
	description?: ReactNode;
}

export const DrawerSheet = (props: DrawerSheetProps) => {
	const isMobile = useIsMobile();

	return (
		<Drawer direction={isMobile ? "bottom" : "right"}>
			<DrawerTrigger
				render={
					<Button
						variant="link"
						className="text-foreground w-fit px-0 text-left"
					/>
				}
			>
				{props.header}
			</DrawerTrigger>
			<DrawerContent className="flex flex-col">
				<DrawerHeader className="shrink-0 gap-1 text-left">
					<div className="flex items-start justify-between gap-4">
						<div className="space-y-1">
							<DrawerTitle>{props.title}</DrawerTitle>
							{props.description ? (
								<p className="text-sm text-muted-foreground">
									{props.description}
								</p>
							) : null}
						</div>
						<DrawerClose
							render={
								<Button
									variant="ghost"
									size="icon"
									className="size-8 shrink-0 text-muted-foreground"
									aria-label="Close"
								/>
							}
						>
							<X className="size-4" />
						</DrawerClose>
					</div>
				</DrawerHeader>
				<Separator className="shrink-0" />
				<div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
					{props.children}
				</div>
			</DrawerContent>
		</Drawer>
	);
};
