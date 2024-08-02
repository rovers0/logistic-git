import moment from 'moment';

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
            return `<span class="green"><i class="fa fa-check-circle"></i>Còn ${daysDiff} ngày</span>`;
        } else if (daysDiff === 0) {
            return '<span class="green"><i class="fa fa-check-circle"></i>Còn hạn đến ngày hôm nay</span>';
        } else {
            return `<span class="red"><i class="fa fa-times-circle"></i>Hết hạn ${Math.abs(daysDiff)} ngày</span>`;
        }
    } catch (error) {
        return null;
    }
}

export function formatNumber(number) {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

export function sumByKey(data) {
    const totals = {};

    for (const vehicle of data) {
        for (const key in vehicle) {
        if (typeof vehicle[key] === 'number') {
            if (!totals.hasOwnProperty(key)) {
                totals[key] = 0;
            }
                totals[key] += vehicle[key];
            }
        }
    }

    return totals;
}

export function objectToFormData (obj, formData, parentKey) {
    formData = formData || new FormData();
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let propName = parentKey ? `${parentKey}[${key}]` : key;
            if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
                objectToFormData(obj[key], formData, propName);
            } else if (Array.isArray(obj[key])) {
                obj[key].forEach((item, index) => {
                    objectToFormData(item, formData, `${propName}[${index}]`);
                });
            } else {
                formData.append(propName, obj[key]);
            }
        }
    }
    return formData;
}

export function timeToTimeStr(data) {
    if(!data) return null
    if(typeof data !== 'object') return data
    return data.hours+':'+data.minutes+':'+data.seconds
}

export function monthToDate(data, to=false, format="YYYY-MM-DD") {
    if(!data) return null
    if (to) return moment(data).endOf('month').format(format)
    return moment(data).startOf('month').format(format)
}

export function timeToString(object, format='YYYY-MM-DD') {
    if(!object || typeof object !== 'object') return object
    return moment(object).format(format)
}

export function formatBeforeRequest(object) {
    for (const key in {...object}) {
        if(typeof object[key] === 'object' && typeof object[key]?.['getFullYear'] === 'function') {
            object[key] = timeToString(object[key])
        }
        if(typeof object[key] === 'object' && (object[key]?.['month'] || object[key]?.['month'] == 0) && object[key]?.['year']) {
            object[key] = monthToDate(object[key])
        }
        if(typeof object[key] === 'object' && (object[key]?.['hours'] || object[key]?.['hours'] == 0) && (object[key]?.['minutes'] || object[key]?.['minutes'] == 0)) {
            object[key] = timeToTimeStr(object[key])
        }
        if(typeof object[key] === 'string' && object[key].substr(0, 11).match(/\d{4}-\d{2}-\d{2}T/)) {
            object[key] = object[key].substr(0, 10)
        }
    }
    return object
}
