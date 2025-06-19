export const formatDayOfYear = (dayOfYearStr: string): string => {
    const dayOfYear = parseInt(dayOfYearStr, 10);
    if (dayOfYear < 1 || dayOfYear > 366) {
        return 'Неверный день года';
    }

    const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    let remainingDays = dayOfYear;
    let monthIndex = 0;

    while (remainingDays > daysInMonths[monthIndex]) {
        remainingDays -= daysInMonths[monthIndex];
        monthIndex++;
    }

    return `${remainingDays} ${monthNames[monthIndex]}`;
};
