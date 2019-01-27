import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";

import TodoItem from "./TodoItem";

const styles = theme => ({});

class Todo extends Component {
    render() {
        const {
            classes,
            idx,
            selected,
            onSelect,
            onDeselect,
            onRevert,
            value
        } = this.props;
        return (
            <TodoItem
                selected={selected}
                onSelect={onSelect}
                onDeselect={onDeselect}
            >
                <ListItemText>{`${idx + 1}. ${value}`}</ListItemText>
                <React.Fragment>
                    <ListItemIcon>
                        <IconButton onClick={onRevert}>
                            <UndoIcon />
                        </IconButton>
                    </ListItemIcon>
                </React.Fragment>
            </TodoItem>
        );
    }
}

export default withStyles(styles)(Todo);
