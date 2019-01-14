import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

const styles = theme => ({
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        width: "50vw",
        maxWidth: "700px"
    },
    input: {
        width: "50%"
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
        todos: []
    };

    onChange = e => this.setState({ curVal: e.target.value });

    onAddTodo = () =>
        this.setState(({ curVal, todos }) => {
            return {
                curVal: "",
                todos: [...todos, curVal]
            };
        });

    render() {
        const { classes } = this.props;
        const { curVal } = this.state;
        return (
            <Grid
                container
                direction="column"
                alignContent="center"
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        <Input
                            type="text"
                            placeholder="...new todo"
                            multiline={true}
                            rows={1}
                            rowsMax={5}
                            onChange={this.onChange}
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
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(App);
