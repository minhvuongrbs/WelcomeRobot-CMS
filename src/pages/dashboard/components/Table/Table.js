import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Avatar
} from "@material-ui/core";

const TableComponent = ({ data }) => {
  const keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, avatar, fullName, skypeName, hierarchy }) => (
          <TableRow key={id}>
            <TableCell>
              <Avatar src={avatar} />
            </TableCell>
            <TableCell className="pl-3 fw-normal">{fullName}</TableCell>
            <TableCell>{skypeName}</TableCell>
            <TableCell>{hierarchy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
