import React from "react";
import {
	Grid,
	IconButton,
	Select,
	MenuItem
} from "@mui/material";
import { withStyles, WithStyles } from '@mui/styles';
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

interface HeaderProps extends WithStyles<typeof styles> {
	date: Date;
	setDate: (date: Date) => void;
	nextDisabled: boolean;
	prevDisabled: boolean;
	onClickNext: () => void;
	onClickPrevious: () => void;
}

const styles = () => ({
	iconContainer: {
		padding: 5
	},
	icon: {
		padding: 10,
		"&:hover": {
			background: "none"
		}
	}
});

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec"
];

const generateYears = (relativeTo: Date, count: number) => {
	const half = Math.floor(count / 2);
	return Array(count)
		.fill(0)
		.map((_, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
	date,
	classes,
	setDate,
	nextDisabled,
	prevDisabled,
	onClickNext,
	onClickPrevious
}) => {
	const handleMonthChange = (event: SelectChangeEvent<{ value: unknown }>): void => {
		setDate(setMonth(date, parseInt(event.target.value as string)));
	};

	const handleYearChange = (event: SelectChangeEvent<{ value: unknown }>) => {
		setDate(setYear(date, parseInt(event.target.value as string)));
	};

	return (
		<Grid container justifyContent="space-between" alignItems="center">
			<Grid item className={classes?.iconContainer}>
				<IconButton
					className={classes?.icon}
					disabled={prevDisabled}
					onClick={onClickPrevious}>
					<ChevronLeft color={prevDisabled ? "disabled" : "action"} />
				</IconButton>
			</Grid>
			<Grid item>
				<Select
					value={getMonth(date) as any}
					onChange={handleMonthChange}
					MenuProps={{ disablePortal: true }}>
					{MONTHS.map((month, idx) => (
						<MenuItem key={month} value={idx}>
							{month}
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Grid item>
				<Select
					value={getYear(date) as any}
					onChange={handleYearChange}
					MenuProps={{ disablePortal: true }}>
					{generateYears(date, 30).map(year => (
						<MenuItem key={year} value={year}>
							{year}
						</MenuItem>
					))}
				</Select>

			</Grid>
			<Grid item className={classes?.iconContainer}>
				<IconButton className={classes?.icon} disabled={nextDisabled} onClick={onClickNext}>
					<ChevronRight color={nextDisabled ? "disabled" : "action"} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Header);
