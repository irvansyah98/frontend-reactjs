import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Pagination from "react-js-pagination";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class UserIndex extends Component{

    constructor(){
        super();
        this.state={
            user: [],
            msg: null,
            type: null,
            flash: false,
            alert:null,
            activePage: 0,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
            pageRangeDisplayed: 5,
            navigate: false,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    hideAlert(){
        this.setState({
            alert:null,
        });
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem("userData"));
        axios.get(`http://localhost:8000/api/users?page=` + this.state.activePage,{
            headers: {
              'Authorization': `Bearer ${userData.token}` 
            }
        }).then(response => {
            this.setState({
                user: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
            })
        })
    }

    handlePageChange(pageNumber) {
        const userData = JSON.parse(localStorage.getItem("userData"));
        axios.get(`http://localhost:8000/api/users?page=` + pageNumber,{
            headers: {
                'Authorization': `Bearer ${userData.token}` 
            }
        }).then(response => {
                this.setState({
                    user: response.data.data,
                    activePage: response.data.current_page,
                });
            })
    }

    confirmDelete(id){
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Hapus"
                cancelBtnText="Tidak"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Tunggu..."
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn>
                    Apakah anda yakin ingin menghapus ?
                </SweetAlert>
        );
        this.setState({
            alert:getAlert()
        });
    }

    deleteItem(id){
        const userData = JSON.parse(localStorage.getItem("userData"));
        axios.delete(`http://localhost:8000/api/user/delete/${id}`,{
            headers: {
                'Authorization': `Bearer ${userData.token}` 
            }
        }).then(response => {
            var msg = response.data.success;
            if(msg == true){
                this.hideAlert();
                this.goToHome();
            }
        })
    }

    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess()}
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap">
                    Deleted user successfully
                </SweetAlert>
        );
        this.setState({
            alert:getAlert()
        });
    }

    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
          navigate: true,
        });
    };

    render(){
        const userData = JSON.parse(localStorage.getItem("userData"));
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/" push={true} />;
        }
        const login = localStorage.getItem("isLoggedIn");
          if (!login) {
            return <Redirect to="/" />;
          }
        const {user} = this.state
        return(
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                All Users
                            </div>
                            <div className="card-body">
                                <form method="get" className="form-inline">
                                <div className="form-group">
                                    <label htmlFor="exampleInputName2">Cari</label>
                                    <input type="text" className="form-control" name="keyword" id="exampleInputName2" placeholder="Cari..." required/>
                                </div>&nbsp;
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail2">Filter By</label>
                                    <select className="form-control" name="filter" required>
                                        <option value="Name">Name</option>
                                        <option value="Phone">Phone</option>
                                        <option value="City">City</option>
                                        <option value="Country">Country</option>
                                    </select>
                                </div>&nbsp;
                                <button type="submit" className="btn btn-primary">Submit</button>
                                </form><br/>
                                <Link className="btn btn-primary btn-sm mb-3" to="/create">
                                    Create New
                                </Link>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>Birth Day</th>
                                                <th>City</th>
                                                <th>Country</th>
                                                <th width="200" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.map((user, i) => (
                                                <tr key={i}>
                                                    <td><img src={`http://localhost:8000/images/${user.photo}`} width="100"/></td>
                                                    <td>{user.firstname} {user.lastname} <br/> {user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.birthdate}</td>
                                                    <td>{user.city}</td>
                                                    <td>{user.country}</td>
                                                    <td width="200" className="text-center">
                                                        {userData.isAdmin ? 
                                                        <div className="btn-group">
                                                            <Link className="btn btn-primary" to={`/users/${user.id}`}>View</Link>
                                                            <Link className='btn btn-success' to={`/users/edit/${user.id}`}>Edit</Link>
                                                            <button className='btn btn-danger' onClick={() => this.confirmDelete(user.id)}>Delete</button>
                                                        </div>
                                                        : ''}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {this.state.alert}
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                    />
                                </div>
                                <Button
                                    className="btn btn-primary text-right"
                                    onClick={this.onLogoutHandler}
                                >
                                Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserIndex;