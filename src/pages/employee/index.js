import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = () => ({
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 500,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: 10,
        minWidth: 120,
    },
    button: {
        margin: 10,
    },
})
class Employee extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            skype_name: '',
            skype_id: '',
            skypes: [],
            error: null,
            isLoader: false,
        }
        this._skypeHandler = this._skypeHandler.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }
    componentDidMount() {
        fetch("https://api.welcomerobot.t.s2.siouxdev.com/wr/v1/skypes")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        skypes: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    _skypeHandler(event) {
        const {skypes} = this.state;
        const skype = skypes.find(s => s.skype_id === event.target.value);
        if(skype){
            this.setState({
                skype_name: skype.username,
                skype_id: event.target.value,
            });
        }
    }
    _onSubmit() {
        const { skype_name, skype_id} = this.state;
        console.log("skype_id " + skype_id);
        console.log("skype_name " + skype_name);

        
    }
    render() {
        const { classes } = this.props;
        const { error, isLoaded, skypes, skype_id } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <PageTitle title="Employee Account Management" />
                    <Widget title="Skype Account" upperTitle noBodyPadding>
                        <form className={classes.container}>
                            <TextField
                                required
                                id="standard-required"
                                label="Full Name"
                                defaultValue="Fill your full name"
                                className={classes.textField}
                                margin="normal"
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="skype-simple">Skype Name</InputLabel>
                                <Select
                                    value={skype_id}
                                    onChange={this._skypeHandler}
                                    inputProps={{
                                        name: 'skype_id',
                                        id: 'skype-simple',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {skypes.map(item => (
                                        <MenuItem key={item.skype_id} value={item.skype_id}>
                                            {item.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="standard-multiline-static"
                                label="English description"
                                multiline
                                rows="4"
                                defaultValue="Please enter your description"
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="Vietnamese description"
                                multiline
                                rows="4"
                                defaultValue="Please enter your description"
                                className={classes.textField}
                                margin="normal"
                            />
                        </form>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this._onSubmit}>
                            Submit
                        </Button>
                    </Widget>
                </React.Fragment>
            );
        }

    }
}
export default withStyles(styles)(Employee);