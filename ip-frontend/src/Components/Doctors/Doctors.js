import React from "react";
import Layout from "../../Containers/Layout";
import styles from './doctors.module.scss';

const content = (
    <div className={styles.container}>Doctors Page</div>
);

const Doctors = () => {
    return (
        <Layout content={content}/>
    )
};
export default Doctors;

