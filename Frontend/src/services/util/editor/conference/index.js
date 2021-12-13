import { axiosInstance } from '../../../init';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export let uploadConferenceImagesList = async (speaker_image, setPrecentage) => {
    const data = new FormData()
    data.append('file', speaker_image)
    try {
        let value = await axiosInstance.post(BASE_URL + '/upload-conference-image', data,
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

export let uploadConferenceLocationImages = async (speaker_image, setPrecentage) => {
    const data = new FormData()
    data.append('file', speaker_image)
    try {
        let value = await axiosInstance.post(BASE_URL + '/upload-conference-location-image', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    let value = parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total);
                    setPrecentage({ uploadPrecentageLocation: value });

                    setTimeout(() => setPrecentage({ uploadPrecentageLocation: 0 }), 1500);
                },
            });
        return value;
    } catch (error) {
        return error
    }
}

export let getAllWorkshopsForConference = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-workshops-to-create-conference');
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllPresentationsForConference = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-presentations-to-create-conference');
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllSpeakersForConference = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-speakers-to-create-conference');
        return value;
    } catch (error) {
        return error;
    }
}

export let createConference = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/create-conference', {
            conference_name: dataSet.conference_name,
            conference_sub_topic: dataSet.conference_sub_topic,
            conference_type: dataSet.conference_type,
            conference_location_name: dataSet.conference_location_name,
            conference_location_desc: dataSet.conference_location_desc,
            conference_location_google_map_link: dataSet.conference_location_google_map_link,
            conference_location_images_array: dataSet.conference_location_images_array,
            conference_start_date: dataSet.conference_start_date,
            conference_end_date: dataSet.conference_end_date,
            conference_organizer: dataSet.conference_organizer,
            conference_about: dataSet.conference_about,
            conference_images_array: dataSet.conference_images_array,
            attendee_registration_fee: dataSet.attendee_registration_fee,
            researcher_registration_fee: dataSet.researcher_registration_fee,
            workshop_conductor_fee: dataSet.workshop_conductor_fee,
            contact_address: dataSet.contact_address,
            contact_number: dataSet.contact_number,
            contact_email: dataSet.contact_email,
            key_note_speakers: dataSet.key_note_speakers,
            conference_workshops: dataSet.conference_workshops,
            conference_reserch_paper_presentations: dataSet.conference_reserch_paper_presentations
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let editConference = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-conference', {
            conference_id: dataSet.conference_id,
            conference_name: dataSet.conference_name,
            conference_sub_topic: dataSet.conference_sub_topic,
            conference_type: dataSet.conference_type,
            conference_location_name: dataSet.conference_location_name,
            conference_location_desc: dataSet.conference_location_desc,
            conference_location_google_map_link: dataSet.conference_location_google_map_link,
            conference_location_images_array: dataSet.conference_location_images_array,
            conference_start_date: dataSet.conference_start_date,
            conference_end_date: dataSet.conference_end_date,
            conference_organizer: dataSet.conference_organizer,
            conference_about: dataSet.conference_about,
            conference_images_array: dataSet.conference_images_array,
            attendee_registration_fee: dataSet.attendee_registration_fee,
            researcher_registration_fee: dataSet.researcher_registration_fee,
            workshop_conductor_fee: dataSet.workshop_conductor_fee,
            contact_address: dataSet.contact_address,
            contact_number: dataSet.contact_number,
            contact_email: dataSet.contact_email,
            key_note_speakers: dataSet.key_note_speakers,
            conference_workshops: dataSet.conference_workshops,
            conference_reserch_paper_presentations: dataSet.conference_reserch_paper_presentations
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let editPendingConference = async (dataSet) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/edit-temp-conference', {
            conference_id: dataSet.conference_id,
            conference_name: dataSet.conference_name,
            conference_sub_topic: dataSet.conference_sub_topic,
            conference_type: dataSet.conference_type,
            conference_location_name: dataSet.conference_location_name,
            conference_location_desc: dataSet.conference_location_desc,
            conference_location_google_map_link: dataSet.conference_location_google_map_link,
            is_conference_location_images_updating: dataSet.is_conference_location_images_updating,
            conference_location_images_array: dataSet.conference_location_images_array,
            conference_start_date: dataSet.conference_start_date,
            conference_end_date: dataSet.conference_end_date,
            conference_organizer: dataSet.conference_organizer,
            conference_about: dataSet.conference_about,
            is_conference_images_updating: dataSet.is_conference_images_updating,
            conference_images_array: dataSet.conference_images_array,
            attendee_registration_fee: dataSet.attendee_registration_fee,
            researcher_registration_fee: dataSet.researcher_registration_fee,
            workshop_conductor_fee: dataSet.workshop_conductor_fee,
            contact_address: dataSet.contact_address,
            contact_number: dataSet.contact_number,
            contact_email: dataSet.contact_email,
            key_note_speakers: dataSet.key_note_speakers,
            conference_workshops: dataSet.conference_workshops,
            conference_reserch_paper_presentations: dataSet.conference_reserch_paper_presentations
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllConferences = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-conferences');
        return value;
    } catch (error) {
        return error;
    }
}

export let getAllPendingConferences = async () => {
    try {
        let value = await axiosInstance.get(BASE_URL + '/editor/get-all-temp-conferences');
        return value;
    } catch (error) {
        return error;
    }
}

export let getPendingConference = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-temp-conference', {
            conference_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getConference = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-conference', {
            conference_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getConferencePreview = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-conference-preview', {
            conference_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}

export let getPendingConferencePreview = async (data) => {
    try {
        let value = await axiosInstance.post(BASE_URL + '/editor/get-single-temp-conference-preview', {
            conference_id: data
        });
        return value;
    } catch (error) {
        return error;
    }
}
