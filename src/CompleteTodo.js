import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({});

class Todo extends Component {
    render() {
        const {
            classes,
            idx,
            selected,
            onSelect,
            onRevert,
            value
        } = this.props;
        return (
            <ListItem selected={selected} onClick={onSelect}>
                <ListItemText>{`${idx + 1}. ${value}`}</ListItemText>
                <React.Fragment>
                    <ListItemIcon>
                        <IconButton onClick={onRevert}>
                            <UndoIcon />
                        </IconButton>
                    </ListItemIcon>
                </React.Fragment>
            </ListItem>
        );
    }
}

export default withStyles(styles)(Todo);
