import React, { useState, useCallback, useRef } from 'react';
import styles from './FileProcessor.module.css';
import { aggregateData } from '../../api/api';
import { useStore } from '../../store/useStore';
import Dropzone from './Dropzone/Dropzone.tsx';
import Stats from './Stats/Stats.tsx';
import { formatNumber } from '../../utils/formatNumber.ts';

interface AggregationData {
    [key: string]: unknown;
}

const FileProcessor: React.FC = () => {
    const [rows] = useState<number>(10000);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [lastJson, setLastJson] = useState<AggregationData | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasError, setHasError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setCurrentData, addHistoryItem, updateHistoryItem } = useStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setLastJson(null);

            if (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) {
                setHasError(false);
            } else {
                setHasError(true);
                addHistoryItem({
                    timestamp: new Date(),
                    type: 'upload',
                    params: { filename: file.name },
                    status: 'error',
                    result: 'Неверный формат файла. Требуется .csv',
                });
            }
        }
    };

    const clearFile = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        setLastJson(null);
        setHasError(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const processFile = useCallback(async () => {
        if (!selectedFile || hasError) return;

        setIsProcessing(true);
        setLastJson(null);
        setHasError(false);

        const historyId = addHistoryItem({
            timestamp: new Date(),
            type: 'aggregate',
            params: { rows, filename: selectedFile.name },
            status: 'pending',
        });

        try {
            const stream = await aggregateData(rows, selectedFile);
            if (!stream) throw new Error('Поток данных не получен');

            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let lastValidObject: AggregationData | null = null;

            const processBuffer = () => {
                let objectStart = -1;
                let openBraces = 0;
                let inString = false;

                for (let i = 0; i < buffer.length; i++) {
                    const char = buffer[i];

                    if (char === '"' && (i === 0 || buffer[i - 1] !== '\\')) {
                        inString = !inString;
                    }

                    if (!inString) {
                        if (char === '{') {
                            if (openBraces === 0) {
                                objectStart = i;
                            }
                            openBraces++;
                        } else if (char === '}') {
                            openBraces--;

                            if (openBraces === 0 && objectStart !== -1) {
                                try {
                                    const jsonStr = buffer.substring(objectStart, i + 1);
                                    const data = JSON.parse(jsonStr) as AggregationData;
                                    lastValidObject = data;
                                    setLastJson(data);

                                    buffer = buffer.substring(i + 1);
                                    i = -1;
                                    objectStart = -1;
                                } catch (e) {
                                    console.error('Ошибка парсинга JSON:', e);
                                    objectStart = -1;
                                }
                            } else if (openBraces < 0) {
                                openBraces = 0;
                                objectStart = -1;
                            }
                        }
                    }
                }
            };

            for (;;) {
                const { done, value } = await reader.read();

                if (done) {
                    processBuffer();
                    break;
                }

                buffer += decoder.decode(value, { stream: true });
                processBuffer();
            }

            if (lastValidObject) {
                setCurrentData(lastValidObject);
                updateHistoryItem(historyId, {
                    result: lastValidObject,
                    status: 'success',
                });
            } else {
                throw new Error('Не удалось обработать данные');
            }
        } catch (error) {
            setHasError(true);
            updateHistoryItem(historyId, {
                result: error instanceof Error ? error.message : 'Ошибка обработки',
                status: 'error',
            });
            console.error('Ошибка при обработке файла:', error);
        } finally {
            setIsProcessing(false);
        }
    }, [selectedFile, hasError, rows, setCurrentData, addHistoryItem, updateHistoryItem]);

    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за сверхнизкое
                время
            </div>
            <Dropzone
                isProcessing={isProcessing}
                selectedFile={selectedFile}
                lastJson={lastJson}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                onClear={clearFile}
                hasError={hasError}
                onError={() => setHasError(true)}
            />

            {!isProcessing && !lastJson && !hasError && (
                <button
                    onClick={processFile}
                    className={styles.processButton}
                    disabled={!selectedFile || isProcessing || hasError}
                >
                    Отправить
                </button>
            )}

            {lastJson && <Stats data={lastJson} formatNumber={formatNumber} />}

            {!isProcessing && !lastJson && (
                <div className={styles.higlightText}>
                    Здесь
                    <br />
                    появятся хайлайты
                </div>
            )}
        </div>
    );
};

export default FileProcessor;
