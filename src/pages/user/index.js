import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import Table from '../dashboard/components/Table/Table';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    fetch("https://api.welcomerobot.t.s2.siouxdev.com/wr/v1/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.data
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
  render() {
    const usersData = [];
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      users.forEach(
        user => {
          var userDataItem = {}
          userDataItem["user_id"] = user.user_id
          userDataItem["avatar"] = user.data.avatar
          userDataItem["fullName"] = user.full_name
          userDataItem["skypeName"] = user.skype_name
          userDataItem["hierarchy"] = user.data.hierarchy_name
          usersData.push(userDataItem)
        }
      )
      return (
        <React.Fragment>
          <PageTitle title="User Management" />
          <Widget title="All User" upperTitle noBodyPadding>
            <Table data={usersData} />
          </Widget>
        </React.Fragment>
      );
    }
  }
}

export default Users;