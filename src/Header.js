import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Header extends Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-dark">
                <div className='container'>
                    <Link className='navbar-brand' to='/'>Reacts</Link>
                </div>
            </nav> 
        );
    }
}

export default Header;