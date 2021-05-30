import moment from 'moment';

export const formatDate = (date, format = 'YYYY/MM/DD') => {
    if (!date) return;
    return moment(date).format(format);
}

export const formatTime = (date, format = 'hh:m a') => {
    if (!date) return;
    return moment(date).format(format)
}

export const relativeTime = (date, relative = "hour") => {
    if (!date) return;
    return moment(date).startOf(relative).fromNow();
}