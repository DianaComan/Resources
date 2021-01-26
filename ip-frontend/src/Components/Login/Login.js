import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from "../../Containers/Layout";
import styles from './Login.module.scss';
import MainContext from "../../Context/provider/context";
import {Input, Button} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import logo from "../../login.png";
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const content = (handleLogin, handleChange) => (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={logo}/>
                </div>
                <Input
                    className={styles.input}
                    onChange={event => handleChange(event, 'email')}
                    size="large"
                    placeholder="Email"
                    prefix={<MailOutlined/>}/>
                <Input.Password
                    className={styles.input}
                    onChange={event => handleChange(event, 'password')}
                    size="large"
                    placeholder="Parola"
                    prefix={<LockOutlined/>}
                />
            </div>
            <button
                    variant="contained"
                    className={styles.button}
                    size={'large'}
                    onClick={() => handleLogin()}
            >
                <p>LOGIN</p>
            </button>
            <Link className={styles.link} to={'/signup'}>Nu ai cont? Inregistreaza-te!</Link>
        </div>
    </div>
);
const Login = props => {
    const historyInstance = createBrowserHistory();
    const history = useHistory();
    const {login, isLogged} = useContext(MainContext).profile;
    const {getProfile, details} = useContext(MainContext).profile;
    const [state, setState] = React.useState({email: '', password: ''});

    const handleChange = (event, field) => {
        event.persist();
        setState(prevState => {
            return {
                ...prevState,
                [field]: event.target.value
            };
        });
    };

    const handleLogin = () => {
        login(state.email, state.password)
    };
    getProfile(state.email).then(() => {
        if (isLogged) {
            history.push({
                pathname: '/profile'
            })
        }    
    })

    return (
        <Layout content={content(handleLogin, handleChange)}/>
    )
};


export default Login;

