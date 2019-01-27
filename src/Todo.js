import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const styles = theme => ({});

class Todo extends Component {
    state = {
        isModifying: false,
        value: this.props.value
    };

    onModify = () => this.setState({ isModifying: true });

    onChange = e => this.setState({ value: e.target.value });

    onKeyPress = e => {
        const { onUpdate } = this.props;
        const { value } = this.state;
        return e.key === "Enter" ? onUpdate(value) : null;
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
            onUpdate,
            onComplete,
            onDelete,
            value
        } = this.props;
        const { isModifying, value: curValue } = this.state;
        return isModifying ? (
            <ClickAwayListener onClickAway={this.onDeselect}>
                <ListItem selected={selected} onClick={onSelect}>
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
                            onClick={() => {
                                this.setState({ isModifying: false });
                                onUpdate(curValue);
                            }}
                        >
                            <SaveIcon />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemIcon>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            </ClickAwayListener>
        ) : (
            <ClickAwayListener onClickAway={this.onDeselect}>
                <ListItem selected={selected} onClick={onSelect}>
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
                </ListItem>
            </ClickAwayListener>
        );
    }
}

export default withStyles(styles)(Todo);
