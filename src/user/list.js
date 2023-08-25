import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DataService from '../services/service'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from '../common/router';

class ListUser extends React.Component {

  constructor(props) {
    super(props);
    // this.getListUser = this.getListUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      items: [],
      id: null
    };
  };
  getListUser() {
    DataService.getAll()
      .then(response => {
        this.setState({
          items: response.data.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  componentDidMount() {
    this.getListUser();
  }

  deleteUser(item) {
    const newsId = {
      id: item.id
    };
    console.log(newsId);
    DataService.delete(newsId)
      .then(response => {
        this.setState({
          id: item.id
        });
        console.log(response.data);
        this.getListUser()
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    const { items } = this.state;
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Join Date</TableCell>
              <TableCell align="center">Official Date</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.employee_id}</TableCell>
                <TableCell align="center">{item.join_date}</TableCell>
                <TableCell align="center">{item.official_date}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">
                  <Link to={"/users/" + item.id}><Button onClick={() => this.props.setValue(2)} >Edit</Button></Link>
                  <Button onClick={() => this.deleteUser(item)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
export default withRouter(ListUser)