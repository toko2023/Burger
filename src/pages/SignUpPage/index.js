import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import * as  actions from "../../redux/actions/signupActions";

class SignUp extends Component {

    state = {
        email: "",
        password1: "",
        password2: "",
        error: ""
    };

    changeEmail = (e) => {
        this.setState({ email: e.target.value})
    };

    changePassword1 = (e) => {
        this.setState({ password1: e.target.value})
    };

    changePassword2 = (e) => {
        this.setState({ password2: e.target.value})
    };

    signup = () => {
        if(this.state.password1 === this.state.password2) {
            this.props.signupUser(this.state.email, this.state.password1);
            
        } else {
            this.setState({error: 'Нууц үгнүүд хоорондоо таарахгүй байна.'});
        }
    };

    render() {
        return (
            <div className={css.Signup}>
                {this.props.userId && <Redirect to="/" /> }
                <h1>Бүртгэлийн форм</h1>
                <div>Та өөрийн мэдээллээ оруулна уу</div>
                <input onChange={this.changeEmail} type="text" placeholder="Имайл хаяг" />
                <input onChange={this.changePassword1} type="password" placeholder="Нууц үгээ оруулна уу." />
                <input onchange={this.changePassword2} type="password" placeholder="Нууц үгээ давтан оруулна уу." />

                {this.state.error && (<div style={{color: "red"}}>{this.state.error}</div>)};

                {this.props.firebaseError && <div style={{color: "red"}}>{this.props.firebaseError}</div>}

                {this.props.saving && <Spinner /> }
                <Button text="БҮРТГҮҮЛЭХ" btnType = "Success" daragdsan={this.signup} />

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        saving: state.signupReducer.saving,
        firebaseError: state.signupReducer.firebaseError,
        userId: state.signupReducer.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (email, password) => dispatch(actions.signupUser(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);