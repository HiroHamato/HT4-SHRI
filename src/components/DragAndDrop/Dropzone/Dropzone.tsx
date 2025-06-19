import React, { useCallback } from 'react';
import styles from './Dropzone.module.css';
import FileInfo from '../FileInfo/FileInfo';
import ProcessingSpinner from '../ProcessingSpinner/ProcessingSpinner.tsx';
import DropzonePrompt from './DropzonePrompt.tsx';

interface DropzoneProps {
    isProcessing: boolean;
    selectedFile: File | null;
    lastJson: unknown;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: (e: React.MouseEvent) => void;
    hasError: boolean;
    onError: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
    isProcessing,
    selectedFile,
    lastJson,
    fileInputRef,
    onFileChange,
    onClear,
    hasError,
}) => {
    const [dragActive, setDragActive] = React.useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                const event = {
                    target: { files: [file] },
                } as React.ChangeEvent<HTMLInputElement>;
                onFileChange(event);
            }
        },
        [onFileChange]
    );

    const handleClick = () => {
        if (!isProcessing && fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    return (
        <div
            className={`${styles.dropzone} ${dragActive ? styles.dragActive : ''} ${selectedFile ? styles.loadedFile : ''} ${hasError ? styles.error : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                className={styles.fileInput}
                onChange={onFileChange}
                ref={fileInputRef}
                hidden
                disabled={isProcessing}
            />

            <div className={styles.errorContainer}>
                {isProcessing ? (
                    <ProcessingSpinner />
                ) : selectedFile ? (
                    <FileInfo
                        fileName={selectedFile.name}
                        onClear={onClear}
                        isProcessed={!!lastJson}
                        hasError={hasError}
                    />
                ) : (
                    <DropzonePrompt />
                )}
                {hasError && !isProcessing && <div className={styles.errorText}>упс, не то...</div>}
            </div>
        </div>
    );
};

export default Dropzone;
