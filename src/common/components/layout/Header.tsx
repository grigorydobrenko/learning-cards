import React from 'react';
import {Link} from "react-router-dom";
import {PATH} from "../../../app/Routes";
import styles from "./Header.module.css"

const Header = () => {
    return (
        <div className={styles.header}>
            <Link to={PATH.LOGIN} className={styles.link}>Login</Link>
            <Link to={PATH.SIGN_UP} className={styles.link}>Sign up</Link>
            <Link to={PATH.PROFILE} className={styles.link}>Profile</Link>
            <Link to={PATH.NOT_FOUND} className={styles.link}>Not found</Link>
            <Link to={PATH.RESTORE_PASSWORD} className={styles.link}>Restore password</Link>
            <Link to={PATH.CHANGE_PASSWORD} className={styles.link}>Change password</Link>
            <Link to={PATH.COMPONENTS} className={styles.link}>Components</Link>
        </div>
    );
};

export default Header;