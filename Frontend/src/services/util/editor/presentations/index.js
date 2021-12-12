import { axiosInstance } from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export let ceatePresentation = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/create-presentation', {
            speaker_id: dataSet.speaker_id,
            presentation_topic: dataSet.presentation_topic,
            presentation_description: dataSet.presentation_description,
            presentation_date_and_time: dataSet.presentation_date_and_time,
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let editPresentation = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-presentation', {
            presentation_id: dataSet.presentation_id,
            speaker_id: dataSet.speaker_id,
            presentation_topic: dataSet.presentation_topic,
            presentation_description: dataSet.presentation_description,
            presentation_date_and_time: dataSet.presentation_date_and_time,
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let editPendingPresentation = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-temp-presentation', {
            presentation_id: dataSet.presentation_id,
            speaker_id: dataSet.speaker_id,
            presentation_topic: dataSet.presentation_topic,
            presentation_description: dataSet.presentation_description,
            presentation_date_and_time: dataSet.presentation_date_and_time,
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getPresentations = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-presentations');
        return value;
    } catch (error) {
        return error;
    }
}

export let getPendingPresentations = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-temp-presentations');
        return value;
    } catch (error) {
        return error;
    }
}

export let getPendingPresentation = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-temp-presentation', {
            presentation_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}


export let getPresentation = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-presentation', {
            presentation_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}