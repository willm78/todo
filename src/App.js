import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import List from "@material-ui/core/List";

import Todo from "./Todo";
import CompleteTodo from "./CompleteTodo";

const styles = theme => ({
    container: {
        margin: `${theme.spacing.unit * 2}px 0`
    },
    paper: {
        padding: theme.spacing.unit * 4,
        width: "50vw",
        maxWidth: "700px",
        minHeight: "85vh"
    },
    input: {
        width: "75%"
    },
    addButton: {
        padding: theme.spacing.unit,
        margin: theme.spacing.unit
    },
    buttonText: {
        margin: `0 ${theme.spacing.unit}px`
    }
});

class App extends Component {
    state = {
        curVal: "",
        nextId: 0,
        selected: null,
        todos: {},
        completed: {}
    };

    onKeyPress = e => {
        return e.key === "Enter" ? this.onAddTodo() : null;
    };

    onChange = e => {
        return e.key === "Enter"
            ? null
            : this.setState({ curVal: e.target.value });
    };

    onAddTodo = () =>
        this.setState(({ curVal, nextId, todos }) => {
            return curVal.length
                ? {
                      curVal: "",
                      nextId: nextId + 1,
                      todos: { ...todos, [nextId]: curVal }
                  }
                : null;
        });

    onSelect = key => () => this.setState({ selected: key });

    onDeselect = () => this.setState({ selected: null });

    onUpdate = key => value => {
        this.setState(({ todos }) => ({
            todos: { ...todos, [key]: value },
            selected: null
        }));
    };

    onComplete = key => () => {
        this.setState(({ todos, completed }) => {
            const { [key]: toComplete, ...rest } = todos;
            return {
                todos: rest,
                completed: { ...completed, [key]: toComplete }
            };
        });
    };

    onDelete = key => () => {
        this.setState(({ todos }) => {
            const { [key]: toDelete, ...rest } = todos;
            return {
                todos: rest
            };
        });
    };

    onRevert = key => () => {
        this.setState(({ todos, completed }) => {
            const { [key]: toRevert, ...rest } = completed;
            return {
                todos: { ...todos, [key]: toRevert },
                completed: rest
            };
        });
    };

    render() {
        const { classes } = this.props;
        const { curVal, selected, todos, completed } = this.state;
        return (
            <Grid
                container
                direction="column"
                alignContent="center"
                alignItems="center"
                justify="center"
                className={classes.container}
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        <Input
                            type="text"
                            placeholder="...new todo"
                            onChange={this.onChange}
                            onKeyPress={this.onKeyPress}
                            value={curVal}
                            className={classes.input}
                        />
                        <Button
                            variant="contained"
                            disabled={!curVal}
                            onClick={this.onAddTodo}
                            className={classes.addButton}
                        >
                            <Typography
                                className={classes.buttonText}
                                color="inherit"
                            >
                                Add
                            </Typography>
                            <NoteAddIcon />
                        </Button>
                        <Typography variant="h5">Current</Typography>

                        <List>
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
                        <Typography variant="h5">Completed</Typography>
                        <List>
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
