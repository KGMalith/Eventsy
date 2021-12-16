import { axiosInstance } from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export let adminAddNewUser = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/admin/add-new-user', {
            user_email: dataSet.user_email,
            user_name_title: dataSet.user_name_title,
            user_first_name: dataSet.user_first_name,
            user_last_name: dataSet.user_last_name,
            user_role: dataSet.user_role
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let adminGetUserList = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/admin/view-users');
        return value;
    } catch (error) {
        return error;
    }
}