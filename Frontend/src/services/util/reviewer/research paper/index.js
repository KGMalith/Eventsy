import { axiosInstance } from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export let reviewerGetAllResearchPapers = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/reviewer/get-all-research-papers');
        return value;
    } catch (error) {
        return error;
    }
}

export let reviewerGetResearchPaper = async (user_id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/reviewer/get-research-paper',{
            user_id: user_id
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let reviewerAcceptResearchPaper = async (user_id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/reviewer/approve-research-paper', {
            user_id: user_id
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let reviewerRejectResearchPaper = async (user_id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/reviewer/reject-research-paper', {
            user_id: user_id
        });
        return value;
    } catch (error) {
        return error;
    }
}