import React, { Component } from 'react';
import { Routes, Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Toolbar from '../../components/Toolbar';
import SideBar from "../../components/SideBar";
import BurgerPage from '../BurgerPage';
import OrderPage from '../OrderPage';
import ShippingPage  from '../ShippingPage';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions";
import * as signupActions from "../../redux/actions/signupActions";

import css from './style.module.css';


class App extends Component {

  state = {
    showSidebar: false
  };

  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar }
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const refreshToken = localStorage.getItem('refreshToken');
    const expireDate = new Date(localStorage.getItem('expireDate'));

    if(token) {
      if(expireDate > new Date()) {
        //Token-ий хугацаа дуусаагүй автоматаар логин хийнэ
        this.props.autoLogin(token, userId);
        //Үлдсэн хугацааг тооцоолж байна
        this.props.autoLogoutAfterMillisec(expireDate.getTime() - new Date().getTime());
      } else {
        //токений хугацаа нь дууссан, logout хийнэ
        this.props.Logout();
        
      }
      
    }
  };

  render () {
    return (
      <div>
          <Toolbar toggleSideBar={this.toggleSideBar} />
            <SideBar 
              showSideBar={this.state.showSidebar} 
              toggleSideBar={this.toggleSideBar} 
            />
            <main className= {css.Content}>
              
              {this.props.userId ? (
                <Fragment>
                  <Route path="/logout" component={ Logout } />
                  <Route path="/orders" component={ OrderPage } />
                  <Route path="/ship" component={ ShippingPage }/>
                  <Route path="/" component={ BurgerPage } /> 
                </Fragment>
              ) : ( 
                <Fragment>
                  <Switch>
                    <Routes> 
                      <Route path="/login" component={ LoginPage } />
                      <Route path="/signup" component={ SignUpPage } />
                      <Redirect to="/login" />
                    </Routes> 
                  </Switch> 
                </Fragment>
              )}   
            </main> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.signupReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) => dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupActions.logout()),
    logout: () => dispatch(signupActions.autoLogoutAfterMillisec())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
