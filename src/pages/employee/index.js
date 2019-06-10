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
        margin: 30,
        minWidth: 150,
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
        this._hierarchyHandler = this._hierarchyHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        fetch("/wr/v1/skypes")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("skype: " + result.data[0].username);
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
        const { skypes } = this.state;
        const skype = skypes.find(s => s.skype_id === event.target.value);
        if (skype) {
            this.setState({
                skype_name: skype.username,
                skype_id: event.target.value,
            });
        }
    }
    _hierarchyHandler(event) {
        this.setState({
            hierarchy_name: event.target.value,
        });
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        })
    }
    handleSubmit() {
        const { skype_name, skype_id, full_name, eng_description, viet_description, hierarchy_name, avatar }
            = this.state;
        fetch('/wr/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: full_name,
                skype_name: skype_name,
                avatar: avatar,
                description: [eng_description, viet_description],
                hierarchy_name: hierarchy_name,
                permission: 1,
                skype_id: skype_id,
            })
        }).then(response => {
            console.log("response: "+ response);
            alert("created successfull")
        }).catch(error => {
            console.log("push error"+error)
        })
    }
    render() {
        const hierarchyName = ['Board of directors',
            'Chief Executive Officer',
            'Chief Operation Officer',
            'Chief Finance Officer',
            'Chief Technology Officer',
            'Senior Project Manager',
            'Project Manager',
            'Junior Project Manager',
            'Senior Project leader',
            'Senior Quality Analyst',
            'Senior Testing Officer',
            'Resource Management Officer',
            'Human Resource Manager',
            'Human Resource',
            'Junior Human Resource',
            'Senior Software Engineer',
            'Software Engineer',
            'Junior Software Engineer',
            'Software Testing Officer',
            'Quality Testing Officer',
            'Team Leader'
        ];
        const { classes } = this.props;
        const { error, isLoaded, skypes, skype_id, hierarchy_name } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <PageTitle title="Employee Management" />
                    <Widget title="Skype Account" upperTitle noBodyPadding>
                        <form className={classes.container} >
                            <TextField
                                required
                                id="standard-required"
                                label="Full Name"
                                defaultValue="Fill your full name"
                                className={classes.textField}
                                margin="normal"
                                name="full_name"
                                onChange={this.handleChange}
                            />
                            <FormControl required className={classes.formControl}>
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
                            <FormControl required className={classes.formControl} >
                                <InputLabel htmlFor="hierarchy-simple">Hierarchy Name</InputLabel>
                                <Select
                                    value={hierarchy_name}
                                    onChange={this._hierarchyHandler}
                                    inputProps={{
                                        name: 'hierarchy_id',
                                        id: 'hierarchy-simple',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {hierarchyName.map(item => (
                                        <MenuItem key={item} value={item}>
                                            {item}
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
                                name="eng_description"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="Vietnamese description"
                                multiline
                                rows="4"
                                defaultValue="Please enter your description"
                                className={classes.textField}
                                margin="normal"
                                name="viet_description"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="Avatar"
                                defaultValue="Please insert your avatar link right here"
                                className={classes.textField}
                                margin="normal"
                                name="avatar"
                                onChange={this.handleChange}
                            />
                        </form>
                        <Button variant="contained" color="primary"
                            className={classes.button} onClick={this.handleSubmit}>
                            Submit
                        </Button>

                    </Widget>
                </React.Fragment>
            );
        }

    }
}
export default withStyles(styles)(Employee);