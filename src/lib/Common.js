import moment from 'moment';
const Common = {
    parseDate(dateString, format){
        const date = moment(dateString).format(format);
        return date;
    },
    //Get datetime object of now.
    genDate(){
        const date = moment().format('MM-DD-YYYY');
        return date;
    },
};

export default Common;