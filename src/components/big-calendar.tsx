"use client";

import {
	Navigate as BCNavigate,
	Views as BCViews,
	Calendar,
	dateFnsLocalizer as fnsLocalizer,
} from "react-big-calendar";
// @ts-expect-error
import { default as TG } from "react-big-calendar/lib/TimeGrid";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

export const dateFnsLocalizer = fnsLocalizer;
export const TimeGrid = TG;
export const Views = BCViews;
export const Navigate = BCNavigate;
export const BigCalendar = Calendar;
