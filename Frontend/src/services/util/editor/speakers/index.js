import {axiosInstance} from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export let uploadSpeakerImage = async (speaker_image, setPrecentage) => {
    const data = new FormData()
    data.append('file', speaker_image)
    try {
        let value = await axiosInstance.post(BASE_URL + '/upload-speaker-image', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    let value = parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total);
                    setPrecentage({ imageUploadPrecentage: value });

                    setTimeout(() => setPrecentage({ imageUploadPrecentage: 0 }), 1500);
                },
            });
        return value;
    } catch (error) {
        return error
    }
}

export let ceateSpeaker = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/create-speaker', {
            speaker_title: dataSet.speaker_title,
            speaker_first_name: dataSet.speaker_first_name,
            speaker_last_name: dataSet.speaker_last_name,
            speaker_affiliation: dataSet.speaker_affiliation,
            twitter_link: dataSet.twitter_link,
            facebook_link: dataSet.facebook_link,
            linkedin_link: dataSet.linkedin_link,
            image_link: dataSet.image_link
        });
        return value;
    } catch (error) {
        return error
    }
}

export let editSpeaker = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-speaker', {
            speaker_id: data.speaker_id,
            speaker_title: data.speaker_title,
            speaker_first_name: data.speaker_first_name,
            speaker_last_name: data.speaker_last_name,
            speaker_affiliation: data.speaker_affiliation,
            is_image_updating: data.is_image_updating,
            twitter_link: data.twitter_link,
            facebook_link: data.facebook_link,
            linkedin_link: data.linkedin_link,
            image_link: data.image_link
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let editTempSpeaker = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-temp-speaker', {
            speaker_id: data.speaker_id,
            speaker_title: data.speaker_title,
            speaker_first_name: data.speaker_first_name,
            speaker_last_name: data.speaker_last_name,
            speaker_affiliation: data.speaker_affiliation,
            is_image_updating: data.is_image_updating,
            twitter_link: data.twitter_link,
            facebook_link: data.facebook_link,
            linkedin_link: data.linkedin_link,
            image_link: data.image_link
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllSpeakers = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-speakers');
        return value;
    } catch (error) {
        return error;
    }
}

export let getPendingSpeakers = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-temp-speakers');
        return value;
    } catch (error) {
        return error;
    }
}

export let getPendingSpeaker = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-temp-speaker', {
            speaker_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}


export let getSpeaker = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-speaker', {
            speaker_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllSpeakersList = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-speakers-list');
        return value;
    } catch (error) {
        return error;
    }
}