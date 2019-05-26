import React, {Component} from 'react';
import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import Table from '../dashboard/components/Table/Table';
import mock from '../dashboard/mock';

const userDump = [
  {
    id: 0,
    name: "Mark Otto",
    email: "ottoto@wxample.com",
    product: "ON the Road",
    price: "$25 224.2",
    date: "11 May 2017",
    city: "Otsego",
    status: "Sent"
    },
  {
    id: 1,
    name: "Jacob Thornton",
    email: "thornton@wxample.com",
    product: "HP Core i7",
    price: "$1 254.2",
    date: "4 Jun 2017",
    city: "Fivepointville",
    status: "Sent"
    },
  {
    id: 2,
    name: "Larry the Bird",
    email: "bird@wxample.com",
    product: "Air Pro",
    price: "$1 570.0",
    date: "27 Aug 2017",
    city: "Leadville North",
    status: "Pending"
    },
  {
    id: 3,
    name: "Joseph May",
    email: "josephmay@wxample.com",
    product: "Version Control",
    price: "$5 224.5",
    date: "19 Feb 2018",
    city: "Seaforth",
    status: "Declined"
    },
  {
    id: 4,
    name: "Peter Horadnia",
    email: "horadnia@wxample.com",
    product: "Let's Dance",
    price: "$43 594.7",
    date: "1 Mar 2018",
    city: "Hanoverton",
    status: "Sent"
    }
];

// const Users = props => (
//   <React.Fragment>
//     <PageTitle title="User Management" />
//     <Widget title="All User" upperTitle noBodyPadding>
//       <Table data={userDump} />
//     </Widget>
//   </React.Fragment>
// );

class Users extends Component{
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
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {users.map(user => (
            <li key={user.user_id}>
              {user.full_name} {user.first_name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Users;