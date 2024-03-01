import _ from "lodash"
import { IEventfilter } from "../interfaces"
import moment from "moment"


export const validateString = (str: any): str is string => {
    return _.isString(str)
}

export const validatePassword = (pass: any): pass is string => {
    return validateString(pass) && /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass)
}

export const validateBoolean = (bl: any): bl is boolean => {
    return _.isBoolean(bl)
}

export const validateEventFilter = (filter?: IEventfilter): filter is IEventfilter => {
    let isValid: boolean = true;

    if (!filter) {
        return false;
    }

    if (filter.startTime) {
        isValid = validateDateTime(filter.startTime)
    }

    if (filter.endTime) {
        isValid = validateDateTime(filter.endTime)
    }

    return isValid;
}

export const validateDateTime = (time: string): time is string => {
    try {
        return moment(time, true).isValid();

    } catch (error) {
        return false;
    }
}