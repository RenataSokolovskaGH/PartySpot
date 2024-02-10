
export const errorCodes = {
    Success: {
        title: "Success",
        message: "Operation successful",
        code: 'e_0',
    },
    ApiRouteNotFound: {
        title: "Page Not Found",
        message: "Error 404",
        code: 'e_2',
    },
    WrongParameters: {
        title: "Invalid Params",
        message: "Invalid Parameters Provided",
        code: 'e_3',
    },
    ProblemWithProcessing: {
        title: "Problem With Processing",
        message: "Problem with processing current operation",
        code: 'e_8',
    },
    WrongPassword: {
        title: "Invalid Password",
        message: "Your password must contain at least 8 characters, capital letter, small letter, number, special character.",
        code: 'e_9',
    },
    EnableToGenerateUsername: {
        title: "Unable to Generate Username",
        message: "Username threshold has been exceeded",
        code: 'e_10',
    }
}
