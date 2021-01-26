import React, {useContext} from 'react';
import Layout from "../../Containers/Layout";
import styles from './Creaza.module.scss';
import {Input, Button, DatePicker} from 'antd';
import {UserOutlined, InfoCircleOutlined, PictureOutlined,OrderedListOutlined, LockOutlined, BankOutlined, AuditOutlined, PhoneOutlined, MailOutlined} from '@ant-design/icons';
import logo from "../../creaza.png";
import {Link} from 'react-router-dom';
import MainContext from "../../Context/provider/context";


const content = (handleCreaza, handleChange) => (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={logo}/>
                </div>
                <Input
                    className={styles.input}
                    onChange={event => handleChange(event, 'nume_organizatie')}
                    size="large"
                    placeholder="Nume organizatie"
                    prefix={<BankOutlined/>}
                />
                
            </div>
            <button type="primary"
                    className={styles.button}
                    size={'large'}
                    onClick={() => handleCreaza()}
            >
                <p>CREAZA</p>
            </button>
            <Link className={styles.link} to={'/signup'}>Ai deja o organizatie?</Link>
        </div>
    </div>
);
const Creaza = () => {
    const {createOrganisation} = useContext(MainContext).profile;

    const [state, setState] = React.useState(
        {
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

    const handleCreaza = () => {
        createOrganisation(state.nume_organizatie);
    };
    return (
        <Layout content={content(handleCreaza, handleChange)}/>
    )
};
export default Creaza;
