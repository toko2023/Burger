import React from "react";

import logoImage from "../../assets/images/Burger logo.jpg";
import css from './style.module.css';

const Logo = () => (
    <div className={css.Logo}>
        <img src={logoImage} />
    </div>
);

export default Logo;