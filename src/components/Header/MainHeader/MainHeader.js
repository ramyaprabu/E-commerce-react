import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BottomHeader from '../BottomHeader/BottomHeader';
import * as authActions from '../../../store/actions/authActions';
import Logo from '../../Logo';
import './style.css';

import { connect } from 'react-redux';

class MainHeader extends Component{

    componentDidMount() {
        this.props.getToken();
    }


    render() {
        let guestAccount = <ul className="Dropdown Account">
                                <li><Link to="/signup"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Register</span></Link></li>
                                <li><Link to="/login"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Login</span></Link></li>
                            </ul>;
        if(this.props.auth.isAuthenticated){
            guestAccount = <ul className="Dropdown Account">
                                <li><Link to="/orders"><i className="far fa-clipboard"></i>&nbsp;&nbsp;<span>Orders</span></Link></li>
                                <li><Link to="" onClick={() => this.props.logout()}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;<span>Logout</span></Link></li>
                            </ul>;
        }

        return (
            <div className="MainHeader">
                <div> <Logo /></div>
                        <BottomHeader />
                <div>
                <ul className="MainMenu">
                        <li className="MenuItem">
                        <Link to="/cart"><i className="fas fa-shopping-cart"></i>({this.props.cartCount})</Link>
                        </li>
                        <li className="MenuItem">
                            <Link to="/account">{this.props.auth.isAuthenticated ? this.props.auth.user.firstName: <i className="far fa-user-circle"></i>}</Link>
                            {guestAccount}
                        </li>

                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);