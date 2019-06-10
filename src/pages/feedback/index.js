import React from 'react';
import MUIDataTable from "mui-datatables"; 
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
class Feedback extends Component{
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        users: []
      };
    }
  
    componentDidMount() {
      fetch("/wr/v1/feedbacks")
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
           <MUIDataTable
            title={"Feedback List"}
            data={users}
            columns={columns}
            options={options}
            />
        );
      }
    }
  }
  

export default Feedback;