import React, { useState } from 'react';
import styles from './GeneratePage.module.css';
import { generateReport } from '../../api/api';

const GeneratePage: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');

    const handleGenerate = async () => {
        setStatus('generating');

        try {
            const blob = await generateReport();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    const handleReset = () => {
        setStatus('idle');
    };

    const getButtonContent = () => {
        switch (status) {
            case 'idle':
                return 'Начать генерацию';
            case 'generating':
                return <div className={styles.buttonSpinner}></div>;
            case 'success':
                return 'Done!';
            case 'error':
                return 'Ошибка';
            default:
                return 'Начать генерацию';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.generatorCard}>
                <p className={styles.description}>
                    Сгенерируйте готовый csv-файл нажатием одной кнопки
                </p>
                <div className={styles.buttonContainer}>
                    <button
                        className={`${styles.generateButton} ${status === 'success' ? styles.successButton : ''} ${status === 'error' ? styles.errorButton : ''}`}
                        onClick={status === 'success' ? handleReset : handleGenerate}
                        disabled={status === 'generating'}
                    >
                        {getButtonContent()}
                    </button>
                    {(status === 'success' || status === 'error') && (
                        <div className={styles.closeIcon} onClick={handleReset}>
                            ✕
                        </div>
                    )}
                </div>
                <div className={styles.statusContainer}>
                    {status === 'generating' && (
                        <div className={styles.generatingText}>идёт процесс генерации</div>
                    )}

                    {status === 'error' && <div className={styles.errorText}>упс, не то...</div>}

                    {status === 'success' && (
                        <div className={styles.successText}>файл сгенерирован!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeneratePage;
