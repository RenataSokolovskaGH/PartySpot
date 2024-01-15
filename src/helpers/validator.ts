import _ from "lodash"


export const validateString = (str: any): str is string => {
    return _.isString(str)
}

export const validatePassword = (pass: any): pass is string => {
    return validateString(pass) && /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass)
}

export const validateBoolean = (bl: any): bl is boolean => {
    return _.isBoolean(bl)
}