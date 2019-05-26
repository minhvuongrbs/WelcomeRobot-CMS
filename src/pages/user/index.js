import React from 'react';
import { Grid } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import Table from '../dashboard/components/Table/Table';
import mock from '../dashboard/mock'; 
import { Component } from 'react';
const columns = [
    {
     name: "_id",
     label: "Id",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "comment",
     label: "Comment",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "rating",
     label: "Rating",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "created_at",
     label: "Created At",
     options: {
      filter: true,
      sort: false,
     }
    },
   ];   
   const options = {
     filterType: 'textField',
     selectableRows: 'none'
   };
class Users extends Component{
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        users: [],
       
      };
    }
  
    componentDidMount() {
      fetch("https://api.welcomerobot.t.s2.siouxdev.com/wr/v1/feedbacks")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              users: result.data,
              subUsers: result.data.data
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
           <MUIDataTable
            title={"Employee List"}
            data={users}
            columns={columns}
            options={options}
            />
       
        )
      }
    }
  }
  

export default Users;