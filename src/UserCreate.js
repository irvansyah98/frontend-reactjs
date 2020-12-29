import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from "react-router-dom";

class UserCreate extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            birthdate: '',
            city: '',
            country: '',
            photo:'',
            isAdmin:'',
            alert: null,
            errors:[]
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFieldFileChange = this.handleFieldFileChange.bind(this);
        this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
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

    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title='Success!'
                onConfirm={() =>this.onSuccess()}
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap">
                    Created user successfully
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

    handleCreateNewUser(event){
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
        const userData = JSON.parse(localStorage.getItem("userData"));
        axios.post('http://localhost:8000/api/user/store',user,{
            headers: {
                'Authorization': `Bearer ${userData.token}` 
              }
        }).then(response => {
            var msg = response.data.success;
            if(msg == true){
                return this.goToHome();
            }
        })
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
        return(
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewUser}>
                                    <div className='form-group'>
                                        <label htmlFor='photo'>Photo</label>
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
                                            value={this.state.password}
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
                                    <Link className='btn btn-primary' to={`/`}>Back</Link>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-primary'>Create</button>
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
export default UserCreate;