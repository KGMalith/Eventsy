import {axiosInstance} from '../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TOKEN_KEY = 'isLoggedIn';


//signIn API Call
export let signin = async (email, password) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/signin', {
            user_email: email,
            password: password,
        })
        if (value.success === true) {
            setAccessToken(value.data.token);
            setAccountName(value.data.user_name);
            setAccountRole(value.data.user_role);
            setEmailVerified(value.data.is_email_activated);
            localStorage.setItem(TOKEN_KEY, true);
        }
        return value;
    } catch (error) {
        return error;
    }
}

//signUp API Call
export let signUp = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/signup', {
            user_email: dataSet.signinEmail,
            password: dataSet.signinPassword,
            mobile_number: dataSet.mobile,
            name_title: dataSet.nameTitle,
            first_name: dataSet.firstName,
            last_name: dataSet.lastName,
            affiliation: dataSet.affiliation,
            role: dataSet.userType,
            file_url: dataSet.file_url
        })
        return value;
    } catch (error) {
        return error;
    }
}

//upload research paper pdf
export let uploadResearchPaperFile = async (fileData, setPrecentage) => {
    let formData = new FormData();
    formData.append('file', fileData);
    try {
        let value = await axiosInstance.post(BASE_URL + '/upload-research-paper', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    let value = parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total);
                    setPrecentage({ uploadPrecentage: value });

                    setTimeout(() => setPrecentage({ uploadPrecentage: 0 }), 1500);
                },
            });
        return value;
    } catch (error) {
        return error
    }
}

//upload research paper pdf
export let uploadWorkshopProposalFile = async (fileData, setPrecentage) => {
    let formData = new FormData();
    formData.append('file', fileData);
    try {
        let value = await axiosInstance.post(BASE_URL + '/upload-workshop-proposal', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    let value = parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total);
                    setPrecentage({ uploadPrecentageConference: value });

                    setTimeout(() => setPrecentage({ uploadPrecentageConference: 0 }), 1500);
                },
            });
        return value;
    } catch (error) {
        return error
    }
}

//email verify API Call
export let verifyEmail = async (email,code) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/validate-email', {
            user_email: email,
            verification_code: code,
        })
        return value;
    } catch (error) {
        return error;
    }
}

//forgot password email verify API Call
export let forgotPasswordEmailVerify = async (email) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/forgot-password', {
            user_email: email,
        })
        return value;
    } catch (error) {
        return error;
    }
}

//reset password verify API Call
export let resetPassword = async (code,email,password) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/reset-password', {
            verification_code:code,
            user_email: email,
            new_password: password,
        })
        return value;
    } catch (error) {
        return error;
    }
}


//resend token  API Call
export let resendToken = async (email) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/resend-token', {
            user_email: email
        })
        return value;
    } catch (error) {
        return error;
    }
}


//set Access Token
export let setAccessToken = (value) => {
    return localStorage.setItem('token', value);
}

//get Access Token 
export let getAccessToken = () => {
    return localStorage.getItem('token');
}

//set Account Role
export let setAccountRole = (value) => {
    return localStorage.setItem('userRole', value);
}

//get Account Role
export let getAccountRole = () => {
    return localStorage.getItem('userRole');
}

//set Account Name
export let setAccountName = (value) => {
    return localStorage.setItem('name', value);
}

//get Account Name
export let getAccountName = () => {
    return localStorage.getItem('name');
}

//set email verification state
export let setEmailVerified = (value) => {
    return localStorage.setItem('isEmailVerified', value);
}

//get email verification state
export let getEmailVerified = () => {
    return localStorage.getItem('isEmailVerified');
}

//delete Access Token
export let logout = () => {
    return localStorage.clear();
}

//Check user is logged in function
export let isLogin = () => {
    return localStorage.getItem(TOKEN_KEY) ? true : false;
}

