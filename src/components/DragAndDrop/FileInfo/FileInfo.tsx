import React from 'react';
import styles from './FileInfo.module.css';

interface FileInfoProps {
    fileName: string;
    onClear: (e: React.MouseEvent) => void;
    isProcessed: boolean;
    hasError: boolean;
}

const FileInfo: React.FC<FileInfoProps> = ({ fileName, onClear, isProcessed, hasError }) => {
    return (
        <div>
            <div className={styles.fileInfo}>
                <span
                    className={`${styles.fileName} ${isProcessed ? styles.greenBackground : ''} ${hasError ? styles.errorBackground : ''}`}
                >
                    {fileName}
                </span>
                <button className={styles.clearButton} onClick={onClear}>
                    ×
                </button>
            </div>
            {isProcessed && !hasError && <div className={styles.processingText}>Готово!</div>}
        </div>
    );
};

export default FileInfo;
