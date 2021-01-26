import React from "react";
import styles from './Layout.module.scss';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = props => {
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content}>
                {props.content}
            </div>
            <Footer/>
        </div>
    )
};

export default Layout;
