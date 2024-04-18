import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import css from "./style.module.css";
import Button from "../../components/General/Button";
import ContactData from "../../components/ContactData";

class ShippingPage extends React.Component {

    cancelOrder = () => {
        this.props.history.push("/");
    };

    showContactData = () => {
        this.props.history.replace("/ship/contact");
    };

    render() {
        return (
            <div className={css.ShippingPage} >
                <p style={{fontSize: "24px"}}><strong>Таны захиалга</strong></p>
                <p style={{fontSize: "24px"}}><strong>Захиалгын дүн : {this.props.price}₮</strong></p>

                <Burger />
                <Button daragdsan={this.cancelOrder} btnType="Danger" text="ЗАХИАЛГЫГ ЦУЦЛАХ"/>
                <Button daragdsan={this.showContactData} btnType="Success" text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"/>
                
                <Route path="/ship/contact">
                    <ContactData  />
                </Route>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        price: state.burgerReducer.totalPrice
    }
}
export default connect(mapStateToProps)(ShippingPage);