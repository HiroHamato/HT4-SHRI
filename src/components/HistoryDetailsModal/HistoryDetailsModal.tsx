import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './HistoryDetailsModal.module.css';
import type { HistoryItem } from '../../store/useStore';
import { formatNumber } from '../../utils/formatNumber';
import { formatDayOfYear } from '../../utils/formatDate';

interface HistoryDetailsModalProps {
    item: HistoryItem;
    onClose: () => void;
}

const HistoryDetailsModal: React.FC<HistoryDetailsModalProps> = ({ item, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const container = document.createElement('div');
        container.id = 'modal-root';
        document.body.appendChild(container);
        setPortalContainer(container);

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (container.parentNode === document.body) {
                document.body.removeChild(container);
            }
        };
    }, [onClose]);

    if (!portalContainer) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
                <div className={styles.statsContent}>
                    <div className={styles.statRow}>
                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>
                                {formatNumber(item.result.total_spend_galactic)}
                            </div>
                            <div className={styles.statSubscription}>
                                общие расходы в галактических кредитах
                            </div>
                        </div>
                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>{item.result.less_spent_civ}</div>
                            <div className={styles.statSubscription}>
                                цивилизация с минимальными расходами
                            </div>
                        </div>

                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>
                                {formatNumber(item.result.rows_affected)}
                            </div>
                            <div className={styles.statSubscription}>
                                количество обработанных записей
                            </div>
                        </div>
                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>
                                {formatDayOfYear(item.result.big_spent_at)}
                            </div>
                            <div className={styles.statSubscription}>
                                день года с максимальными расходами
                            </div>
                        </div>

                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>
                                {formatDayOfYear(item.result.less_spent_at)}
                            </div>
                            <div className={styles.statSubscription}>
                                день года с минимальными расходами
                            </div>
                        </div>
                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>
                                {formatNumber(item.result.big_spent_value)}
                            </div>
                            <div className={styles.statSubscription}>
                                максимальная сумма расходов за день
                            </div>
                        </div>

                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>{item.result.big_spent_civ}</div>
                            <div className={styles.statSubscription}>
                                цивилизация с максимальными расходами
                            </div>
                        </div>
                        <div className={styles.statLabel}>
                            <div className={styles.statValue}>
                                {formatNumber(item.result.average_spend_galactic)}
                            </div>
                            <div className={styles.statSubscription}>
                                средние расходы в галактических кредитах
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className={styles.closeButton} onClick={onClose}>
                ×
            </button>
        </div>,
        portalContainer
    );
};

export default HistoryDetailsModal;
