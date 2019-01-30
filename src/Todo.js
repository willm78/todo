import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import TodoItem from './TodoItem';

const styles = theme => ({
  input: {
    width: '100%',
  },
  iconBtn: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit / 2,
  },
});

class Todo extends Component {
  state = {
    isModifying: false,
    value: this.props.value,
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
    return e.key === 'Enter' ? this.onUpdate() : null;
  };

  onDeselect = () => {
    const { onDeselect } = this.props;
    this.setState({
      isModifying: false,
      value: this.props.value,
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
      value,
    } = this.props;
    const { isModifying, value: curValue } = this.state;
    return isModifying ? (
      <TodoItem
        selected={selected}
        onSelect={onSelect}
        onDeselect={this.onDeselect}
      >
        <ListItemText>
          <Input
            type="text"
            placeholder={value}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={curValue}
            className={classes.input}
          />
        </ListItemText>
        <IconButton onClick={this.onUpdate} className={classes.iconBtn}>
          <SaveIcon />
        </IconButton>
        <IconButton onClick={onDelete} className={classes.iconBtn}>
          <DeleteIcon color="error" />
        </IconButton>
      </TodoItem>
    ) : (
      <TodoItem
        selected={selected}
        onSelect={onSelect}
        onDeselect={this.onDeselect}
      >
        <ListItemText>{`${idx + 1}. ${value}`}</ListItemText>
        <IconButton onClick={this.onModify} className={classes.iconBtn}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onComplete} className={classes.iconBtn}>
          <CheckIcon color="action" />
        </IconButton>
      </TodoItem>
    );
  }
}

export default withStyles(styles)(Todo);
