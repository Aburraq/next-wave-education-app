import moment from "moment";

export const compareDateWithToday = (date) => {
    const today = moment().startOf("day");

    const inputDate = moment(date).startOf("day");

    if(inputDate.isSame(today, "day")){
        return "ongoing";
    }else if(inputDate.isAfter(today, "day")){
        return "upcoming";
    } else if(inputDate.isBefore(today, "day")){
        return "past";
    } else{
        return "error";
    }
};