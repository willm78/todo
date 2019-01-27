import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    todoItem: {
        margin: `${theme.spacing.unit}px 0`
    }
});

function TodoItem(props) {
    const { classes, selected, onSelect, onDeselect, children } = props;
    return (
        <ClickAwayListener onClickAway={onDeselect}>
            <ListItem
                selected={selected}
                onClick={onSelect}
                dense
                component={Paper}
                className={classes.todoItem}
            >
                {children}
            </ListItem>
        </ClickAwayListener>
    );
}

export default withStyles(styles)(TodoItem);
