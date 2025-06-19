import React from 'react';
import styles from './ProcessingSpinner.module.css';

const ProcessingSpinner: React.FC = () => {
    return (
        <div className={styles.processingContainer}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
            <div className={styles.processingText}>идет парсинг файла</div>
        </div>
    );
};

export default ProcessingSpinner;
