import { axiosInstance } from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export let adminGetAllRequestedSpeakers = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/admin/get-all-requested-speakers');
        return value;
    } catch (error) {
        return error;
    }
}

export let adminGetRequestedSpeaker = async (id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/admin/get-requested-speaker',{
            speaker_id:id
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let adminAcceptRequestedSpeaker = async (id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/admin/accept-requested-speaker', {
            speaker_id: id
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let adminRejectRequestedSpeaker = async (id) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/admin/reject-requested-speaker', {
            speaker_id: id
        });
        return value;
    } catch (error) {
        return error;
    }
}