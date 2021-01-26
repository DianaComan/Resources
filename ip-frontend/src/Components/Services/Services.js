import React from "react";
import Layout from "../../Containers/Layout";
import styles from './services.module.scss';

const content = (
    <div className={styles.container}>Services Page</div>
);

const Services = () => {
    return (
        <Layout content={content}/>
    )
};
export default Services;

