import * as React from "react";
import {
    IconButton,
    Typography,
    Theme
} from "@mui/material";
import { withStyles, WithStyles } from '@mui/styles';
import { combine } from "../utils";
import { memo } from "react";

interface DayProps extends WithStyles<typeof styles> {
    filled?: boolean;
    outlined?: boolean;
    highlighted?: boolean;
    disabled?: boolean;
    startOfRange?: boolean;
    endOfRange?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    value: number | string;
}

const styles = ((theme: Theme) => ({
    leftBorderRadius: {
        borderRadius: "50% 0 0 50%"
    },
    rightBorderRadius: {
        borderRadius: "0 50% 50% 0"
    },
    buttonContainer: {
        display: "flex"
    },
    button: {
        height: 36,
        width: 36,
        padding: 0
    },
    buttonText: {
        lineHeight: 1.6
    },
    outlined: {
        border: `1px solid ${theme.palette.primary.dark}`
    },
    filled: {
        "&:hover": {
            backgroundColor: theme.palette.primary.dark
        },
        backgroundColor: theme.palette.primary.dark
    },
    highlighted: {
        backgroundColor: theme.palette.action.hover
    },
    contrast: {
        color: theme.palette.primary.contrastText
    }
}));

const Day: React.FunctionComponent<DayProps> = memo((props) => {
    return (
        <div
            className={combine(
                props.classes?.buttonContainer,
                props.startOfRange && props.classes?.leftBorderRadius,
                props.endOfRange && props.classes?.rightBorderRadius,
                !props.disabled && props.highlighted && props.classes?.highlighted
            )}>
            <IconButton
                className={combine(
                    props.classes?.button,
                    !props.disabled && props.outlined && props.classes?.outlined,
                    !props.disabled && props.filled && props.classes?.filled
                )}
                disabled={props.disabled}
                onClick={props.onClick}
                onMouseOver={props.onHover}>
                <Typography
                    color={!props.disabled ? "initial" : "textSecondary"}
                    className={combine(
                        props.classes?.buttonText,
                        !props.disabled && props.filled && props.classes?.contrast
                    )}
                    variant="body2">
                    {props.value}
                </Typography>
            </IconButton>
        </div>
    );
});

export default withStyles(styles)(Day);
