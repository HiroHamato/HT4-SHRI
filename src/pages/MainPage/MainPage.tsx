import React from 'react';
import styles from './MainPage.module.css';
import FileProcessor from '../../components/DragAndDrop/FileProcessor';

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <FileProcessor />
        </div>
    );
};

export default HomePage;
