import React from "react";
import styles from './Footer.module.scss';
import {Divider} from "antd";
import {CheckOutlined, FacebookFilled, PhoneFilled} from "@ant-design/icons";

const Footer = () => {
    return (
        <div className={styles.container}>
            <p> Contact </p>
            <h4><FacebookFilled /> Rezerva-ma   <PhoneFilled /> 0756721812</h4>
            
        </div>
    )
};

export default Footer;
