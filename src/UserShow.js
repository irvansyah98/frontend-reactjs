import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from "react-router-dom";

class UserShow extends Component{

    constructor(props){
        super(props)
        this.state = {
            user:{}
        }
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userId = this.props.match.params.id
        axios.get(`http://localhost:8000/api/user/${userId}`,{
            headers: {
                'Authorization': `Bearer ${userData.token}` 
              }
        }).then(response => {
            this.setState({
                user:response.data
            })
        })
    }

    render(){
        const login = localStorage.getItem("isLoggedIn");
          if (!login) {
            return <Redirect to="/" />;
          }
        const {user} = this.state
        return(
            <div className="container py-4">
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Detail User</div>
                            <table className="table table-condensed">
                                <tr>
                                    <td>Photo</td>
                                    <td><img src={`http://localhost:8000/images/${user.photo}`} width="200"/></td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{user.firstname} {user.lastname}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td>Birth Date</td>
                                    <td>{user.birthdate}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{user.city}</td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>{user.country}</td>
                                </tr>
                            </table>
                            <Link
                                className='btn btn-primary'
                                to={`/`}>
                                    Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserShow;