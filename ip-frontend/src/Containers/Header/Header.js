import React, {useContext, useEffect, useState} from "react";
import styles from './Header.module.scss';
import logo from '../../logo.png';
import {Link} from 'react-router-dom';
import MainContext from "../../Context/provider/context";
import {Menu} from 'antd';
import {MedicineBoxOutlined, PlusSquareOutlined, FormOutlined, UserOutlined, LogoutOutlined, LoginOutlined} from '@ant-design/icons';

const Header = props => {
    const {logout, getSession, isLogged, currentPage, changePage, getCurrentPage} = useContext(MainContext).profile;

    // const isLogged = true;
    const [state, setState] = useState({
        mounted: false
    });
    useEffect(() => {
        if (!state.mounted) {
            setState(prevState => ({
                ...prevState,
                mounted: true
            }));
            getSession();
            getCurrentPage();
        }
    }, [state.mounted, getSession]);
    const handleChangePage = page => {
        changePage(page);
    };
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logo}>
                {
                    !isLogged ? (
                    <Link onClick={event => handleChangePage({key: 'home'})} className={styles.logo} to={'/'}>
                        <img alt={'logo'} src={logo}/>
                    </Link>
                    ) : (
                    <Link onClick={event => handleChangePage({key: 'profile'})} className={styles.logo} to={'/profile'}>
                        <img alt={'logo'} src={logo}/>
                    </Link>)
                }
                
            </div>
            <div className={styles.buttons}>
                <Menu onClick={event => handleChangePage(event)} selectedKeys={[currentPage]} mode="horizontal">
                    {!isLogged && (
                            <Menu.Item key="login"
                                       className={(currentPage.key === 'login') ? styles.activeTab : null}>
                                <LoginOutlined />
                                <Link className={styles.link} to={'/login'}>Login</Link>
                            </Menu.Item>
                        )
                    }
                    {!isLogged && (
                            <Menu.Item key="signup"
                                       className={(currentPage.key === 'signup') ? styles.activeTab : null}>
                                <PlusSquareOutlined />
                                <Link className={styles.link} to={'/signup'}>Sign up</Link>
                            </Menu.Item>
                        )
                    }
                    {!isLogged && (
                            <Menu.Item key="creaza"
                                       className={(currentPage.key === 'creaza') ? styles.activeTab : null}>
                                <FormOutlined />
                                <Link className={styles.link} to={'/creaza'}>Creaza organizatie</Link>
                            </Menu.Item>
                        )
                    }
                    {isLogged && (
                        <Menu.Item key="profile"
                                   className={(currentPage.key === 'profile') ? styles.activeTab : null}>
                            <UserOutlined/>
                            <Link className={styles.link} to={'/profile'}>Profil</Link>
                        </Menu.Item>
                    )
                    }
                    {isLogged && (
                        <Menu.Item key="logout">
                            <LogoutOutlined/>
                            <Link onClick={() => logout()} className={styles.link} to={'/'}>Logout</Link>
                        </Menu.Item>
                    )
                    }
                </Menu>
            </div>
        </div>
    )
};

export default Header;
