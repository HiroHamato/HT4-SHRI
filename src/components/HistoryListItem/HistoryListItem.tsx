import React from 'react';
import styles from './HistoryListItem.module.css';
import type { HistoryItem } from '../../store/useStore';
import { formatDateTime } from '../../utils/formatDateTime';

interface HistoryListItemProps {
    item: HistoryItem;
    onClick: () => void;
    onDelete: (id: string) => void;
}

const HistoryListItem: React.FC<HistoryListItemProps> = ({ item, onClick, onDelete }) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(item.id);
    };

    const handleClick = () => {
        if (item.status === 'success') {
            onClick();
        }
    };

    const timestamp =
        typeof item.timestamp === 'string' ? new Date(item.timestamp) : item.timestamp;

    return (
        <div
            className={styles.card}
            onClick={handleClick}
            style={{ cursor: item.status === 'success' ? 'pointer' : 'default' }}
        >
            <div className={styles.content}>
                <div className={styles.filename}>
                    <img src="/static/icons/file.png" alt="file" />
                    {item.params.filename}
                </div>
                <div className={styles.date}>{formatDateTime(timestamp)}</div>
                <div
                    className={item.status === 'success' ? styles.verdictTrue : styles.verdictFalse}
                >
                    Обработан успешно
                    <img src="/static/icons/smile.png" alt="smile" />
                </div>
                <div
                    className={item.status !== 'success' ? styles.verdictTrue : styles.verdictFalse}
                >
                    Не удалось обработать
                    <img src="/static/icons/sad.png" alt="sad" />
                </div>
            </div>
            <div className={styles.deleteButton} onClick={handleDelete}>
                <img src="/static/icons/trash.png" alt="delete" />
            </div>
        </div>
    );
};

export default HistoryListItem;
