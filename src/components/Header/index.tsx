import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logoBlock}>
                <img src="/static/img/Logo SS.png" alt="logo" />
                <div className={styles.headerText}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</div>
            </div>
            <div className={styles.linkBlock}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${styles.linkButton} ${styles.activeLink}` : styles.linkButton
                    }
                >
                    <img src="/static/icons/upload.png" alt="upload" />
                    CSV Аналитик
                </NavLink>
                <NavLink
                    to="/generate"
                    className={({ isActive }) =>
                        isActive ? `${styles.linkButton} ${styles.activeLink}` : styles.linkButton
                    }
                >
                    <img src="/static/icons/generate.png" alt="download" />
                    CSV Генератор
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        isActive ? `${styles.linkButton} ${styles.activeLink}` : styles.linkButton
                    }
                >
                    <img src="/static/icons/history.png" alt="history" />
                    История
                </NavLink>
            </div>
        </div>
    );
};

export default Header;
