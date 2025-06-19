import React from 'react';
import styles from './HistoryList.module.css';
import { useStore } from '../../store/useStore';
import type { HistoryItem } from '../../store/useStore';
import HistoryListItem from '../HistoryListItem/HistoryListItem';

interface HistoryListProps {
    onItemClick: (item: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ onItemClick }) => {
    const { history, removeHistoryItem } = useStore();

    const handleDeleteItem = (id: string) => {
        removeHistoryItem(id);
    };

    if (history.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>История операций пуста</p>
            </div>
        );
    }

    return (
        <div className={styles.historyList}>
            {history.map((item) => (
                <HistoryListItem
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item)}
                    onDelete={handleDeleteItem}
                />
            ))}
        </div>
    );
};

export default HistoryList;
