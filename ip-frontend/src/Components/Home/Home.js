import Layout from "../../Containers/Layout";
import styles from './Home.module.scss';
import Background from '../images/background_image.png';
import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import history from '../../Routes/history'

const content = (
    <div className={styles.container}>
        <img  className={styles.img} alt={'Background'} src={Background}/>
        <button
            variant="contained"
            className={styles.button}
            size={'large'} onClick={
                () => {
                    history.push('/login')
                    window.location.reload()
                }
            }>
                <p>Rezervă</p>
        </button>
    </div>
);

const App = () => {
    return (
        <Layout content={content}/>
    )
};
export default App;