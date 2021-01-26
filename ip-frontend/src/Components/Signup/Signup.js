import React, {useContext} from 'react';
import Layout from "../../Containers/Layout";
import styles from './Signup.module.scss';
import {Input, Button, DatePicker} from 'antd';
import {UserOutlined, LockOutlined, BankOutlined, AuditOutlined, PhoneOutlined, MailOutlined} from '@ant-design/icons';
import logo from "../../sign_up.png";
import {Link} from 'react-router-dom';
import MainContext from "../../Context/provider/context";


const content = (handleSignup, handleChange) => (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={logo}/>
                </div>
                <Input
                    className={styles.input}
                    onChange={event => handleChange(event, 'nume_utilizator')}
                    size="large"
                    placeholder="Nume utilizator"
                    prefix={<AuditOutlined />}/>
                <Input
                    className={styles.input}
                    onChange={event => handleChange(event, 'nume_organizatie')}
                    size="large"
                    placeholder="Nume organizatie"
                    prefix={<BankOutlined/>}
                />
                <Input
                    className={styles.input}
                    onChange={event => handleChange(event, 'nume')}
                    size="large"
                    placeholder="Nume"
                    prefix={<UserOutlined/>}/>
                <Input
                    className={styles.input}
                    onChange={event => handleChange(event, 'prenume')}
                    size="large"
                    placeholder="Prenume"
                    prefix={<UserOutlined/>}/>
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
            <button type="primary"
                    className={styles.button}
                    size={'large'}
                    onClick={() => handleSignup()}
            >
                <p>SIGN UP</p>
            </button>
            <Link className={styles.link} to={'/login'}>Ai deja cont?</Link>
        </div>
    </div>
);
const Signup = () => {
    const {signup} = useContext(MainContext).profile;
    const [state, setState] = React.useState(
        {
            email: '',
            password: '',
            nume: '',
            prenume: '',
            nume_utilizator: '',
            nume_organizatie: ''
        });

    const handleChange = (event, field) => {
        if (field === 'date') {
            setState(prevState => {
                return {
                    ...prevState,
                    [field]: event
                };
            });
        } else {
            event.persist();
            setState(prevState => {
                return {
                    ...prevState,
                    [field]: event.target.value
                };
            });
        }
    };

    const handleSignup = () => {
        signup(state.nume_utilizator, state.password, state.email, state.nume, state.prenume, state.nume_organizatie);
        
    };
    return (
        <Layout content={content(handleSignup, handleChange)}/>
    )
};
export default Signup;
