import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";

import TodoItem from "./TodoItem";

const styles = theme => ({});

class Todo extends Component {
    state = {
        isModifying: false,
        value: this.props.value
    };

    onModify = () => this.setState({ isModifying: true });

    onChange = e => this.setState({ value: e.target.value });

    onUpdate = () => {
        const { onUpdate } = this.props;
        const { value } = this.state;
        this.setState({ isModifying: false });
        return onUpdate(value);
    };

    onKeyPress = e => {
        return e.key === "Enter"
          ? this.onUpdate()
          : null;
    };

    onDeselect = () => {
        const { onDeselect } = this.props;
        this.setState({
            isModifying: false,
            value: this.props.value
        });
        onDeselect();
    };

    render() {
        const {
            classes,
            idx,
            selected,
            onSelect,
            onComplete,
            onDelete,
            value
        } = this.props;
        const { isModifying, value: curValue } = this.state;
        return isModifying ? (
            <TodoItem
                selected={selected}
                onSelect={onSelect}
                onDeselect={this.onDeselect}
            >
                <ListItemText>
                    {`${idx + 1}. `}
                    <Input
                        type="text"
                        placeholder={value}
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}
                        value={curValue}
                        className={classes.input}
                    />
                </ListItemText>
                <ListItemIcon>
                    <IconButton
                        onClick={this.onUpdate}
                    >
                        <SaveIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                    <IconButton onClick={onDelete}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </ListItemIcon>
            </TodoItem>
        ) : (
            <TodoItem
                selected={selected}
                onSelect={onSelect}
                onDeselect={this.onDeselect}
            >
                <ListItemText>{`${idx + 1}. ${value}`}</ListItemText>
                <ListItemIcon>
                    <IconButton onClick={this.onModify}>
                        <EditIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                    <IconButton onClick={onComplete}>
                        <CheckIcon color="action" />
                    </IconButton>
                </ListItemIcon>
            </TodoItem>
        );
    }
}

export default withStyles(styles)(Todo);
