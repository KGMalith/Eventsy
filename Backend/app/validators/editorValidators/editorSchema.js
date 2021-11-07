const Joi = require('joi');

const schema = {
	addConferenceValidationSchema: Joi.object({
		conference_name: Joi.string().trim().required(),
		conference_sub_topic:Joi.string().trim().required(),
		conference_type: Joi.string().trim().required(),
		conference_location_name:Joi.string().trim().required(),
		conference_location_desc:Joi.string().trim().required(),
		conference_location_google_map_link: Joi.string().trim().required(),
		conference_location_images_array: Joi.array().items(Joi.string().trim()),
		conference_start_date: Joi.date().required(),
		conference_end_date: Joi.date().required(),
		conference_organizer: Joi.string().trim().required(),
		conference_about: Joi.string().trim().required(),
		conference_images_array: Joi.array().items(Joi.string().trim()),
		attendee_registration_fee: Joi.number().required(),
		researcher_registration_fee: Joi.number().required(),
		workshop_conductor_fee: Joi.number().required(),
		contact_address: Joi.string().trim().required(),
		contact_number:Joi.number().required(),
		contact_email: Joi.string().email().trim().required(),
		key_note_speakers: Joi.array().items(Joi.string().trim().required()),
		conference_workshops: Joi.array().items(Joi.string().trim().required()),
		conference_reserch_paper_presentations: Joi.array().items(Joi.string().trim().required()),
	}),
	editConferenceValidationSchema: Joi.object({
		conference_id:Joi.string().trim().required(),
		conference_name: Joi.string().trim().required(),
		conference_sub_topic: Joi.string().trim().required(),
		conference_type: Joi.string().trim().required(),
		conference_location_name: Joi.string().trim().required(),
		conference_location_desc: Joi.string().trim().required(),
		conference_location_google_map_link: Joi.string().trim().required(),
		conference_location_images_array: Joi.array().items(Joi.string().trim()),
		conference_start_date: Joi.date().required(),
		conference_end_date: Joi.date().required(),
		conference_organizer: Joi.string().trim().required(),
		conference_about: Joi.string().trim().required(),
		conference_images_array: Joi.array().items(Joi.string().trim()),
		attendee_registration_fee: Joi.number().required(),
		researcher_registration_fee: Joi.number().required(),
		workshop_conductor_fee: Joi.number().required(),
		contact_address: Joi.string().trim().required(),
		contact_number: Joi.number().required(),
		contact_email: Joi.string().email().trim().required(),
		key_note_speakers: Joi.array().items(Joi.string().trim().required()),
		conference_workshops: Joi.array().items(Joi.string().trim().required()),
		conference_reserch_paper_presentations: Joi.array().items(Joi.string().trim().required()),
	}),
	editTempConferenceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
		conference_name: Joi.string().trim().required(),
		conference_sub_topic: Joi.string().trim().required(),
		conference_type: Joi.string().trim().required(),
		conference_location_name: Joi.string().trim().required(),
		conference_location_desc: Joi.string().trim().required(),
		conference_location_google_map_link: Joi.string().trim().required(),
		conference_location_images_array: Joi.array().items(Joi.string().trim()),
		conference_start_date: Joi.date().required(),
		conference_end_date: Joi.date().required(),
		conference_organizer: Joi.string().trim().required(),
		conference_about: Joi.string().trim().required(),
		conference_images_array: Joi.array().items(Joi.string().trim()),
		attendee_registration_fee: Joi.number().required(),
		researcher_registration_fee: Joi.number().required(),
		workshop_conductor_fee: Joi.number().required(),
		contact_address: Joi.string().trim().required(),
		contact_number: Joi.number().required(),
		contact_email: Joi.string().email().trim().required(),
		key_note_speakers: Joi.array().items(Joi.string().trim().required()),
		conference_workshops: Joi.array().items(Joi.string().trim().required()),
		conference_reserch_paper_presentations: Joi.array().items(Joi.string().trim().required()),
	}),
	generate_location_image_urls:Joi.object({
		upload_image_array: Joi.array().items(Joi.string().trim().required())
	}),
	generate_conference_image_urls: Joi.object({
		upload_image_array: Joi.array().items(Joi.string().trim().required())
	}),
	addSpeakerValidationSchema:Joi.object({
		speaker_title:Joi.string().trim().required(),
		speaker_first_name:Joi.string().trim().required(),
		speaker_last_name:Joi.string().trim().required(),
		speaker_affiliation:Joi.string().trim().required(),
		twitter_link:Joi.string().trim().allow(null, ''),
		facebook_link:Joi.string().trim().allow(null, ''),
		linkedin_link:Joi.string().trim().allow(null, ''),
		image_link:Joi.string().trim().allow(null,'')
	}),
	editSpeakerValidationSchema:Joi.object({
		speaker_id:Joi.string().trim().required(),
		speaker_title: Joi.string().trim().required(),
		speaker_first_name: Joi.string().trim().required(),
		speaker_last_name: Joi.string().trim().required(),
		speaker_affiliation: Joi.string().trim().required(),
		twitter_link: Joi.string().trim().allow(null, ''),
		facebook_link: Joi.string().trim().allow(null, ''),
		linkedin_link: Joi.string().trim().allow(null, ''),
		image_link: Joi.string().trim().allow(null,'')
	}),
	editTempSpeakerValidationSchema: Joi.object({
		speaker_id: Joi.string().trim().required(),
		speaker_title: Joi.string().trim().required(),
		speaker_first_name: Joi.string().trim().required(),
		speaker_last_name: Joi.string().trim().required(),
		speaker_affiliation: Joi.string().trim().required(),
		twitter_link: Joi.string().trim().allow(null, ''),
		facebook_link: Joi.string().trim().allow(null, ''),
		linkedin_link: Joi.string().trim().allow(null, ''),
		image_link: Joi.string().trim().allow(null, '')
	}),
	generate_speaker_image_urls: Joi.object({
		image_type: Joi.string().trim().required()
	}),
	addWorkshopValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
		workshop_conductor_id: Joi.string().trim().required(),
		speakers_id_list:Joi.array().items(Joi.string().trim().required()),
		workshop_name: Joi.string().trim().required(),
		workshop_description:Joi.string().trim().required(),
		workshop_date_and_time:Joi.date().required()
	}),
	editWorkshopValidationSchema: Joi.object({
		workshop_id: Joi.string().trim().required(),
		speakers_id_list: Joi.array().items(Joi.string().trim().required()),
		workshop_name: Joi.string().trim().required(),
		workshop_description: Joi.string().trim().required(),
		workshop_date_and_time: Joi.date().required()
	}),
	editTempWorkshopValidationSchema: Joi.object({
		workshop_id: Joi.string().trim().required(),
		speakers_id_list: Joi.array().items(Joi.string().trim().required()),
		workshop_name: Joi.string().trim().required(),
		workshop_description: Joi.string().trim().required(),
		workshop_date_and_time: Joi.date().required()
	}),
	getEventPendingResearchPaperValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
	getEventPendingWorkshopProposalValidationSchema: Joi.object({
		user_id: Joi.string().trim().required(),
	}),
	addPresentationValidationSchema:Joi.object({
		user_id: Joi.string().trim().required(),
		presentation_topic: Joi.string().trim().required(),
		presentation_description: Joi.string().trim().required(),
		presentation_date_and_time:Joi.date().required()
	}),
	editPresentationValidationSchema: Joi.object({
		presentation_id: Joi.string().trim().required(),
		presentation_topic: Joi.string().trim().required(),
		presentation_description: Joi.string().trim().required(),
		presentation_date_and_time: Joi.date().required()
	}),
	editTempPresentationValidationSchema: Joi.object({
		presentation_id: Joi.string().trim().required(),
		presentation_topic: Joi.string().trim().required(),
		presentation_description: Joi.string().trim().required(),
		presentation_date_and_time: Joi.date().required()
	}),
	getSingleTempSpeakerValidationSchema: Joi.object({
		speaker_id: Joi.string().trim().required(),
	}),
	getSingleSpeakerValidationSchema: Joi.object({
		speaker_id: Joi.string().trim().required(),
	}),
	getSingleTempPresentationValidationSchema: Joi.object({
		presentation_id: Joi.string().trim().required(),
	}),
	getSinglePresentationValidationSchema: Joi.object({
		presentation_id: Joi.string().trim().required(),
	}),
	getSingleTempWorkshopValidationSchema: Joi.object({
		workshop_id: Joi.string().trim().required(),
	}),
	getSingleWorkshopValidationSchema: Joi.object({
		workshop_id: Joi.string().trim().required(),
	}),
	getSingleTempConferenceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	getSingleConferenceValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	getSingleConferencePreviewValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
	getSingleTempConferencePreviewValidationSchema: Joi.object({
		conference_id: Joi.string().trim().required(),
	}),
};

module.exports = schema;