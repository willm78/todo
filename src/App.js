import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Todo from './Todo';
import CompleteTodo from './CompleteTodo';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    minHeight: '90vh',
  },
  newTodo: {
    display: 'flex',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  input: {
    flex: '1 1 auto',
  },
  iconBtn: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit / 2,
    flex: '0 0 auto',
  },
  list: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
});

class App extends Component {
  state = {
    curVal: '',
    nextId: 0,
    selected: null,
    todos: {},
    completed: {},
  };

  onKeyPress = e => {
    return e.key === 'Enter' ? this.onAddTodo() : null;
  };

  onChange = e => {
    return e.key === 'Enter' ? null : this.setState({ curVal: e.target.value });
  };

  onAddTodo = () =>
    this.setState(({ curVal, nextId, todos }) => {
      return curVal.length
        ? {
            curVal: '',
            nextId: nextId + 1,
            todos: { ...todos, [nextId]: curVal },
          }
        : null;
    });

  onSelect = key => () => this.setState({ selected: key });

  onDeselect = () => this.setState({ selected: null });

  onUpdate = key => value => {
    this.setState(({ todos }) => ({
      todos: { ...todos, [key]: value },
      selected: null,
    }));
  };

  onComplete = key => () => {
    this.setState(({ todos, completed }) => {
      const { [key]: toComplete, ...rest } = todos;
      return {
        todos: rest,
        completed: { ...completed, [key]: toComplete },
      };
    });
  };

  onDelete = key => () => {
    this.setState(({ todos }) => {
      const { [key]: toDelete, ...rest } = todos;
      return {
        todos: rest,
      };
    });
  };

  onRevert = key => () => {
    this.setState(({ todos, completed }) => {
      const { [key]: toRevert, ...rest } = completed;
      return {
        todos: { ...todos, [key]: toRevert },
        completed: rest,
      };
    });
  };

  render() {
    const { classes } = this.props;
    const { curVal, selected, todos, completed } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={9} xl={7}>
          <Paper className={classes.paper}>
            <div className={classes.newTodo}>
              <Input
                type="text"
                autoFocus={true}
                placeholder="...new todo"
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                value={curVal}
                className={classes.input}
              />
              <IconButton
                disabled={!curVal}
                onClick={this.onAddTodo}
                className={classes.iconBtn}
              >
                <NoteAddIcon />
              </IconButton>
            </div>
            <Grid container justify="center">
              <Grid item>
                <Typography variant="h6">Current</Typography>
              </Grid>
            </Grid>
            <Divider />
            <List className={classes.list}>
              {Object.keys(todos).map((key, idx) => (
                <Todo
                  key={key}
                  idx={idx}
                  selected={selected === key}
                  onSelect={this.onSelect(key)}
                  onDeselect={this.onDeselect}
                  onUpdate={this.onUpdate(key)}
                  onComplete={this.onComplete(key)}
                  onDelete={this.onDelete(key)}
                  value={todos[key]}
                />
              ))}
            </List>
            <Grid container justify="center">
              <Grid item>
                <Typography variant="h6">Completed</Typography>
              </Grid>
            </Grid>
            <Divider />
            <List className={classes.list}>
              {Object.keys(completed).map((key, idx) => (
                <CompleteTodo
                  key={key}
                  idx={idx}
                  selected={selected === key}
                  onSelect={this.onSelect(key)}
                  onDeselect={this.onDeselect}
                  onRevert={this.onRevert(key)}
                  value={completed[key]}
                />
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
