import React from 'react';
import styles from './Stats.module.css';
import { formatDayOfYear } from '../../../utils/formatDate';

interface StatsData {
    total_spend_galactic: number;
    less_spent_civ: string;
    rows_affected: number;
    big_spent_at: string;
    less_spent_at: string;
    big_spent_value: number;
    big_spent_civ: string;
    average_spend_galactic: number;
}

interface StatsProps {
    data: StatsData;
    formatNumber: (num: number) => string;
}

const Stats: React.FC<StatsProps> = ({ data, formatNumber }) => {
    return (
        <div className={styles.stats}>
            <div className={styles.statRow}>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>
                        {formatNumber(data.total_spend_galactic)}
                    </div>
                    <div className={styles.statSubscription}>
                        общие расходы в галактических кредитах
                    </div>
                </div>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>{data.less_spent_civ}</div>
                    <div className={styles.statSubscription}>
                        цивилизация с минимальными расходами
                    </div>
                </div>
            </div>

            <div className={styles.statRow}>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>{formatNumber(data.rows_affected)}</div>
                    <div className={styles.statSubscription}>количество обработанных записей</div>
                </div>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>{formatDayOfYear(data.big_spent_at)}</div>
                    <div className={styles.statSubscription}>
                        день года с максимальными расходами
                    </div>
                </div>
            </div>

            <div className={styles.statRow}>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>{formatDayOfYear(data.less_spent_at)}</div>
                    <div className={styles.statSubscription}>
                        день года с минимальными расходами
                    </div>
                </div>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>{formatNumber(data.big_spent_value)}</div>
                    <div className={styles.statSubscription}>
                        максимальная сумма расходов за день
                    </div>
                </div>
            </div>

            <div className={styles.statRow}>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>{data.big_spent_civ}</div>
                    <div className={styles.statSubscription}>
                        цивилизация с максимальными расходами
                    </div>
                </div>
                <div className={styles.statLabel}>
                    <div className={styles.statValue}>
                        {formatNumber(data.average_spend_galactic)}
                    </div>
                    <div className={styles.statSubscription}>
                        средние расходы в галактических кредитах
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
