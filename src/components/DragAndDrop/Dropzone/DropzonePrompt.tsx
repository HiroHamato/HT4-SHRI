import React from 'react';
import styles from './DropzonePrompt.module.css';

const DropzonePrompt: React.FC = () => {
    return (
        <div className={styles.dropPrompt}>
            <div className={styles.dropText1}>Загрузить файл</div>
            <div className={styles.dropText2}>или перетащите сюда</div>
        </div>
    );
};

export default DropzonePrompt;
