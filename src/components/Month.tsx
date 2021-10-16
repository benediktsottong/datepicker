import  React from "react";
import {
	Paper,
	Grid,
	Typography,
	createStyles
} from "@mui/material";
import { withStyles, WithStyles } from '@mui/styles';

import { getDate, isSameMonth, isToday, format, isWithinInterval } from "date-fns";
import {
	chunks,
	getDaysInMonth,
	isStartOfRange,
	isEndOfRange,
	inDateRange,
	isRangeSameDay
} from "../utils";
import Header from "./Header";
import Day from "./Day";
import { NavigationAction, DateRange } from "../types";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const styles = () =>
	createStyles({
		root: {
			width: 290
		},
		weekDaysContainer: {
			marginTop: 10,
			paddingLeft: 30,
			paddingRight: 30
		},
		daysContainer: {
			paddingLeft: 15,
			paddingRight: 15,
			marginTop: 15,
			marginBottom: 20
		}
	});

interface MonthProps extends WithStyles<typeof styles> {
	value: Date;
	marker: symbol;
	dateRange: DateRange;
	minDate: Date;
	maxDate: Date;
	navState: [boolean, boolean];
	setValue: (date: Date) => void;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Month: React.FunctionComponent<MonthProps> = props => {
	const {
		classes,
		helpers,
		handlers,
		value: date,
		dateRange,
		marker,
		setValue: setDate,
		minDate,
		maxDate
	} = props;

	const [back, forward] = props.navState;
	return (
		<Paper square elevation={0} className={classes.root}>
			<Grid container>
				<Header
					date={date}
					setDate={setDate}
					nextDisabled={!forward}
					prevDisabled={!back}
					onClickPrevious={() =>
						handlers.onMonthNavigate(marker, NavigationAction.Previous)
					}
					onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
				/>

				<Grid
					item
					container
					direction="row"
					justifyContent="space-between"
					className={classes.weekDaysContainer}>
					{WEEK_DAYS.map(day => (
						<Typography color="textSecondary" key={day} variant="caption">
							{day}
						</Typography>
					))}
				</Grid>

				<Grid
					item
					justifyContent="space-between"
					container
					className={classes.daysContainer}>
					{chunks(getDaysInMonth(date), 7).map((week, idx) => (
						<Grid key={idx} container direction="row" justifyContent="center">
							{week.map(day => {
								const isStart = isStartOfRange(dateRange, day);
								const isEnd = isEndOfRange(dateRange, day);
								const isRangeOneDay = isRangeSameDay(dateRange);
								const highlighted =
									inDateRange(dateRange, day) || helpers.inHoverRange(day);

								return (
									<Day
										key={format(day, "mm-dd-yyyy")}
										filled={isStart || isEnd}
										outlined={isToday(day)}
										highlighted={highlighted && !isRangeOneDay}
										disabled={
											!isSameMonth(date, day) ||
											!isWithinInterval(day, {
												start: minDate,
												end: maxDate
											})
										}
										startOfRange={isStart && !isRangeOneDay}
										endOfRange={isEnd && !isRangeOneDay}
										onClick={() => handlers.onDayClick(day)}
										onHover={() => handlers.onDayHover(day)}
										value={getDate(day)}
									/>
								);
							})}
						</Grid>
					))}
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(Month);