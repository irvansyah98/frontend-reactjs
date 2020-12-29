import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from "react-router-dom";

class UserEdit extends Component{
    constructor(props){
        super(props)
            this.state = {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                phone: '',
                birthdate: '',
                city: '',
                country: '',
                photo: '',
                photo2: '',
                isAdmin:'',
                alert: null,
                message:'',
                errors:[]
            }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFieldFileChange = this.handleFieldFileChange.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFieldFileChange(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            photo: e.target.result
          })
        };
        reader.readAsDataURL(file);
    }

    componentDidMount(){
        const userId = this.props.match.params.id
        const userData = JSON.parse(localStorage.getItem("userData"));
        axios.get(`http://localhost:8000/api/user/edit/${userId}`,{
            headers: {
                'Authorization': `Bearer ${userData.token}` 
              }
        }).then(response => {
            this.setState({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                password: '',
                phone: response.data.phone,
                birthdate: response.data.birthdate,
                city: response.data.city,
                country: response.data.country,
                photo2: response.data.photo,
                isAdmin: response.data.isAdmin,
            })
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
                confirmBtnText="Oke">
                    {this.state.message}
                </SweetAlert>
        );
        this.setState({
            alert:getAlert()
        });
    }

    onSuccess(){
        this.props.history.push('/');
    }

    hideAlert(){
        this.setState({
            alert:null
        });
    }

    handleUpdateUser(event){
        event.preventDefault();

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            birthdate: this.state.birthdate,
            country: this.state.country,
            city: this.state.city,
            photo: this.state.photo,
            isAdmin: this.state.isAdmin,
        }

        const userId = this.props.match.params.id
        const userData = JSON.parse(localStorage.getItem("userData"));
        axios.put(`http://localhost:8000/api/user/${userId}`, user,{
            headers: {
                'Authorization': `Bearer ${userData.token}` 
              }
        }).then(response => {
                var msg = response.data.success;
                if(msg == true){
                    this.setState({
                        message: response.data.message
                    })
                    return this.goToHome();
                }
            });
    }

    hasErrorFor(field){
        return !!this.state.errors[field]
    }

    renderErrorFor(field){
        if(this.hasErrorFor(field)){
            return(
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render(){
        const login = localStorage.getItem("isLoggedIn");
          if (!login) {
            return <Redirect to="/" />;
          }
        const {user} = this.state
        return(
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Update Data</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleUpdateUser}>
                                    <div className='form-group'>
                                        <label htmlFor='photo'>Photo</label><br/>
                                        <img src={`http://localhost:8000/images/${this.state.photo2}`} width="200"/>
                                        <input
                                            id='photo'
                                            type='file'
                                            className={`form-control ${this.hasErrorFor('photo') ? 'is-invalid' : ''}`}
                                            name='photo'
                                            onChange={this.handleFieldFileChange}/>
                                        {this.renderErrorFor('photo')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='firstname'>Firstname</label>
                                        <input
                                            id='firstname'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('firstname') ? 'is-invalid' : ''}`}
                                            name='firstname'
                                            value={this.state.firstname}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('firstname')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='lastname'>Lastname</label>
                                        <input 
                                            id='lastname'
                                            className={`form-control ${this.hasErrorFor('lastname') ? 'is-invalid' : ''}`}
                                            name='lastname'
                                            value={this.state.lastname}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('lastname')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input 
                                            id='email'
                                            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                            name='email'
                                            value={this.state.email}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('email')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='password'>Password</label>
                                        <input 
                                            id='password'
                                            className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                            name='password'
                                            type='password'
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('password')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='phone'>Phone</label>
                                        <input 
                                            id='phone'
                                            className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                            name='phone'
                                            value={this.state.phone}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('phone')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='birthdate'>Birthdate</label>
                                        <input 
                                            id='birthdate'
                                            type="date"
                                            className={`form-control ${this.hasErrorFor('birthdate') ? 'is-invalid' : ''}`}
                                            name='birthdate'
                                            value={this.state.birthdate}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('birthdate')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='country'>Country</label>
                                        <input 
                                            id='country'
                                            className={`form-control ${this.hasErrorFor('country') ? 'is-invalid' : ''}`}
                                            name='country'
                                            value={this.state.country}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('country')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='city'>City</label>
                                        <input 
                                            id='city'
                                            className={`form-control ${this.hasErrorFor('city') ? 'is-invalid' : ''}`}
                                            name='city'
                                            value={this.state.city}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('city')}
                                    </div>
                                    {
                                        this.state.isAdmin ? 
                                        <div className='form-group'>
                                        {/* <label htmlFor='isAdmin'>Admin</label> */}
                                        <input 
                                            id='isAdmin'
                                            type="checkbox"
                                            className={`${this.hasErrorFor('isAdmin') ? 'is-invalid' : ''}`}
                                            name='isAdmin'
                                            value="1"
                                            checked
                                            onChange={this.handleFieldChange}/>  Admin
                                        {this.renderErrorFor('isAdmin')}
                                    </div>
                                    :
                                    <div className='form-group'>
                                        {/* <label htmlFor='isAdmin'>Admin</label> */}
                                        <input 
                                            id='isAdmin'
                                            type="checkbox"
                                            className={`${this.hasErrorFor('isAdmin') ? 'is-invalid' : ''}`}
                                            name='isAdmin'
                                            value="1"
                                            onChange={this.handleFieldChange}/>  Admin
                                        {this.renderErrorFor('isAdmin')}
                                    </div>
                                    }
                                    
                                    <Link className='btn btn-primary' to={`/`}>Back</Link>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-primary'>Update</button>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserEdit;