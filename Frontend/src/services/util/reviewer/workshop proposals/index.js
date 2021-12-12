import { axiosInstance } from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export let reviewerGetAllWorkshopProposals = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/reviewer/get-all-workshop-proposals');
        return value;
    } catch (error) {
        return error;
    }
}

export let reviewerGetWorkshopProposal = async (user_id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/reviewer/get-workshop-proposal', {
            user_id: user_id
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let reviewerAcceptWorkshopPaper = async (user_id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/reviewer/approve-workshop-proposal', {
            user_id: user_id
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let reviewerRejectWorkshopPaper = async (user_id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/reviewer/reject-workshop-proposal', {
            user_id: user_id
        });
        return value;
    } catch (error) {
        return error;
    }
}