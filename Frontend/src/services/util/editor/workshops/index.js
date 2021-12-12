import { axiosInstance } from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export let createWorkshop = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/create-workshop', {
            speakers_id_list: dataSet.speakers_id_list,
            workshop_name: dataSet.workshop_name,
            workshop_description: dataSet.workshop_description,
            workshop_date_and_time: dataSet.workshop_date_and_time,
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let editWorkshop = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-workshop', {
            workshop_id: dataSet.workshop_id,
            speakers_id_list: dataSet.speakers_id_list,
            workshop_name: dataSet.workshop_name,
            workshop_description: dataSet.workshop_description,
            workshop_date_and_time: dataSet.workshop_date_and_time,
        })
        return value;
    } catch (error) {
        return error;
    }
}

export let editPendingWorkshop = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-temp-workshop', {
            workshop_id: dataSet.workshop_id,
            speakers_id_list: dataSet.speakers_id_list,
            workshop_name: dataSet.workshop_name,
            workshop_description: dataSet.workshop_description,
            workshop_date_and_time: dataSet.workshop_date_and_time,
        })
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllWorkshops = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-workshops');
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllPendingWorkshops = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-temp-workshops');
        return value;
    } catch (error) {
        return error;
    }
}

export let getPendingWorkshop = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-temp-workshop', {
            workshop_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getWorkshop = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-workshop', {
            workshop_id: data
        })
        return value;
    } catch (error) {
        return error;
    }
}