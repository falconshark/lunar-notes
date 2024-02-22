import moment from 'moment';
const Common = {
    parseDate(dateString, format){
        const date = moment(dateString).format(format);
        return date;
    },
};

export default Common;