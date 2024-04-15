export function dispalyPlate (array) {
    const plateStrings = array.map(item => item.plate);
    const plateString = plateStrings.join(', ');

    return plateString;
}

export function daysUsable0(dateStr) {
    try {
        const expiryDate = new Date(dateStr);
        const today = new Date();
        if (isNaN(expiryDate.getTime()) || isNaN(today.getTime())) {
          throw new Error('Invalid date format. Please use YYYY-MM-DD.');
        }
        const timeDiff = expiryDate.getTime() - today.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return daysDiff;
    } catch (error) {
        return null;
    }
}
export function daysUsable (dateStr) {
    try {
        const expiryDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(expiryDate.getTime()) || isNaN(today.getTime())) {
          throw new Error('Invalid date format. Please use YYYY-MM-DD.');
        }
        const daysDiff = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
        if (daysDiff > 0) {
            return `<span class="green"><i class="fa fa-check-circle"></i> Còn hạn ${daysDiff} ngày</span>`;
        } else if (daysDiff === 0) {
            return '<span class="green"><i class="fa fa-check-circle"></i> Còn hạn đến ngày hôm nay </span>';
        } else {
            return `<span class="red"><i class="fa fa-times-circle"></i> Hết hạn ${Math.abs(daysDiff)} ngày </span>`;
        }
    } catch (error) {
        return null;
    }
}
