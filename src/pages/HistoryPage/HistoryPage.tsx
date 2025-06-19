import React, { useState } from 'react';
import styles from './HistoryPage.module.css';
import HistoryList from '../../components/HistoryList/HistoryList';
import HistoryDetailsModal from '../../components/HistoryDetailsModal/HistoryDetailsModal';
import type { HistoryItem } from '../../store/useStore';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const HistoryPage: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clearHistory, history } = useStore();

    const handleItemClick = (item: HistoryItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleClearHistory = () => {
        clearHistory();
    };

    return (
        <div className={styles.container}>
            <HistoryList onItemClick={handleItemClick} />

            {isModalOpen && selectedItem && (
                <HistoryDetailsModal item={selectedItem} onClose={closeModal} />
            )}

            <div className={styles.buttonBlock}>
                <Link to="/generate" className={styles.generateButton}>
                    Сгенерировать больше
                </Link>
                {history.length > 0 && (
                    <button className={styles.clearButton} onClick={handleClearHistory}>
                        Очистить все
                    </button>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
