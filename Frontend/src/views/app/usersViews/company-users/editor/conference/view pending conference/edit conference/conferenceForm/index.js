import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col } from 'react-bootstrap';
import { CommonTextBox } from '../../../../../../../../../components/input-text';
import { CustomTextArea } from '../../../../../../../../../components/text-area';
import { CustomButton } from '../../../../../../../../../components/buttons';
import { CustomDropdown } from '../../../../../../../../../components/select';
import FileUploadBox from '../../../../../../../../../components/upload-box';
import CustomMultiDate from '../../../../../../../../../components/custom-multi-date';
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
import './conferenceForm.scss';
import Switch from "react-switch";

const ConferenceForm = (props) => {
    let [conferenceImages, setConferenceImages] = useState({ checked: false });
    let [locationImages, setLocationImages] = useState({ checked: false });
    //yup validations
    const schema = yup.object({
        conferenceName: yup.string().trim().required('Required'),
        conferenceSubTopic: yup.string().trim().required('Required'),
        conferenceType: yup.string().trim().required('Required'),
        confereceOrganizer: yup.string().trim().required('Required'),
        conferenceAbout: yup.string().trim().required('Required'),
        attendeeFee: yup.number().required('Required'),
        researcherFee: yup.number().required('Required'),
        workshopConductorFee: yup.number().required('Required'),
        contactAddress: yup.string().trim().required('Required'),
        contactNumber: yup.number().required('Required'),
        contactEmail: yup.string().email('Invalid Email').trim().required('Required'),
        attendeeSeat: yup.number().required('Required'),
        researcherSeat: yup.number().required('Required'),
        speakerlist: yup.array().required('Required'),
        workshoplist: yup.array().required('Required'),
        pesentationlist: yup.array().required('Required'),
        locationName: yup.string().trim().required('Required'),
        locationDesc: yup.string().trim().required('Required'),
        locationLink: yup.string().trim().required('Required')
    });
    const animatedComponents = makeAnimated();

    let dropValues = [
        {
            label: 'Online',
            value: 'Online'
        },
        {
            label: 'Physical',
            value: 'Physical'
        }
    ];

    const customStyles = {
        control: (base, state) => ({
            ...base,
            '&:hover': { borderColor: '#86b7fe' },
            '&:focus': { borderColor: '#86b7fe' }, // border style on hover
            border: '1px solid var(--app-primary-border-color)', // default border color
            borderRadius: '0.25rem',
            boxShadow: 'none', // no box-shadow
        })
    }

    const changeConferenceSwitch = (checked) => {
        setConferenceImages({ checked: checked });
    };

    const changeLocationSwitch = (checked) => {
        setLocationImages({ checked: checked });
    };

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => props.submitForm(values)}
                initialValues={{ isConferenceImageUpdating: false, isLocationImageUpdating: false, speakerlist: props.conferenceData.key_note_speakers, workshoplist: props.conferenceData.conference_workshops, pesentationlist: props.conferenceData.conference_reserch_paper_presentations, conferenceName: props.conferenceData.conference_name, conferenceSubTopic: props.conferenceData.conference_sub_topic, conferenceType: props.conferenceData.conference_type, conferenceDays: [props.conferenceData.conference_days.start_date, props.conferenceData.conference_days.end_date], confereceOrganizer: props.conferenceData.conference_organizer, conferenceAbout: props.conferenceData.conference_about, attendeeFee: props.conferenceData.registration_fees.attendee_registration_fee, researcherFee: props.conferenceData.registration_fees.researcher_registration_fee, workshopConductorFee: props.conferenceData.registration_fees.workshop_conductor_registration_fee, contactAddress: props.conferenceData.contact_details.address, contactNumber: props.conferenceData.contact_details.phone_number, contactEmail: props.conferenceData.contact_details.email, attendeeSeat: props.conferenceData.seat_capacity.attendee_seat_capacity, researcherSeat: props.conferenceData.seat_capacity.researcher_seat_capacity, locationName: props.conferenceData.conference_location.location_name, locationDesc: props.conferenceData.conference_location.location_desc, locationLink: props.conferenceData.conference_location.location_google_map_link}}>

                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    submitCount,
                    values
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <span className="form-action-title">Basic Details</span>
                        <hr className="horizontal-line" />
                        <Col>
                            <CommonTextBox
                                controlId="conferenceName"
                                label="Conference Name"
                                type="text"
                                name="conferenceName"
                                classLabel="primaryLabel"
                                classType="primaryTextBox"
                                value={values.conferenceName}
                                handleOnChange={handleChange}
                                errorMessage={errors.conferenceName}
                                isInvalid={submitCount > 0 && !!errors.conferenceName}
                            />
                        </Col>
                        <Row className="mt-3">
                            <Col>
                                <CommonTextBox
                                    controlId="conferenceSubTopic"
                                    label="Conference Sub Topic"
                                    type="text"
                                    name="conferenceSubTopic"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.conferenceSubTopic}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.conferenceSubTopic}
                                    isInvalid={submitCount > 0 && !!errors.conferenceSubTopic}
                                />
                            </Col>
                            <Col>
                                <CustomDropdown
                                    controlId="conferenceType"
                                    label="Conference Type"
                                    dropdownValues={dropValues}
                                    name="conferenceType"
                                    classLabel="primaryLabel"
                                    classType="primaryDropDown"
                                    handleOnChange={handleChange}
                                    errorMessage={errors.conferenceType}
                                    isInvalid={submitCount > 0 && !!errors.conferenceType}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <CustomMultiDate
                                    label="Conference Days"
                                    onChange={(e) => { setFieldValue("conferenceDays", e) }}
                                    value={values.conferenceDays}
                                />
                            </Col>
                            <Col>
                                <CommonTextBox
                                    controlId="confereceOrganizer"
                                    label="Conference Organizer"
                                    type="text"
                                    name="confereceOrganizer"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.confereceOrganizer}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.confereceOrganizer}
                                    isInvalid={submitCount > 0 && !!errors.confereceOrganizer}
                                />
                            </Col>
                        </Row>
                        <Col className="mt-3">
                            <Form.Group>
                                <Form.Label className="primaryLabel">
                                    Key Note Speakers
                                </Form.Label>
                                <div>
                                    <Select
                                        defaultValue={values.speakerlist}
                                        components={animatedComponents}
                                        styles={customStyles}
                                        isMulti
                                        options={props.speakers}
                                        name="speakerlist"
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col className="mt-3">
                            <CustomTextArea
                                controlId="conferenceAbout"
                                label="Conference About"
                                name="conferenceAbout"
                                classLabel="primaryLabel"
                                classType="primaryTextBox"
                                values={values.conferenceAbout}
                                handleOnChange={handleChange}
                                errorMessage={errors.conferenceAbout}
                                isInvalid={submitCount > 0 && !!errors.conferenceAbout}
                            />
                        </Col>
                        <Col className="mt-3">
                            <Form.Group>
                                <Form.Label className="form-label-title">
                                    Is Conference Images Updating?
                                </Form.Label>
                                <div>
                                    <Switch
                                        onChange={(e) => { setFieldValue('isConferenceImageUpdating', e); changeConferenceSwitch(e) }}
                                        checked={values.isConferenceImageUpdating}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        {conferenceImages.checked &&
                            <Col className="mt-3 mb-4">
                                <FileUploadBox
                                    isMultiUpload={true}
                                    maxFileSize={5242880}
                                    maxFilesNumber={10}
                                    name='conferenceImages'
                                    acceptFileTypes={"image/jpeg, image/png, image/jpg"}
                                    viewBoxIcon={<i className="fa fa-picture-o fa-4x" aria-hidden="true"></i>}
                                    uploadFileTopic={'Upload Conference Images'}
                                    onlyAcceptedFileTypesLabel={'Only jpeg,png,jpg files will be accepted. Maximum 10 images are accepted'}
                                    maximumFileSizeInMBLabel={'5'}
                                    setFieldValue={setFieldValue}
                                    errorMessage={submitCount > 0 && errors.uploadfiles}
                                    isInvalid={(submitCount > 0 && errors.uploadfiles) ? true : false}
                                />
                            </Col>
                        }

                        <span className="form-action-title">Advance Details</span>
                        <hr className="horizontal-line" />
                        <Row>
                            <Col>
                                <CommonTextBox
                                    controlId="attendeeFee"
                                    label="Attendee Registration Fee"
                                    type="number"
                                    name="attendeeFee"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    handleOnChange={handleChange}
                                    value={values.attendeeFee}
                                    errorMessage={errors.attendeeFee}
                                    isInvalid={submitCount > 0 && !!errors.attendeeFee}
                                />
                            </Col>
                            <Col>
                                <CommonTextBox
                                    controlId="researcherFee"
                                    label="Researcher Registration Fee"
                                    type="number"
                                    name="researcherFee"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.researcherFee}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.researcherFee}
                                    isInvalid={submitCount > 0 && !!errors.researcherFee}
                                />
                            </Col>
                            <Col>
                                <CommonTextBox
                                    controlId="workshopConductorFee"
                                    label="Workshop Conductor Registration Fee"
                                    type="number"
                                    name="workshopConductorFee"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.workshopConductorFee}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.workshopConductorFee}
                                    isInvalid={submitCount > 0 && !!errors.workshopConductorFee}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <CommonTextBox
                                    controlId="contactAddress"
                                    label="Contact Address"
                                    type="text"
                                    name="contactAddress"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.contactAddress}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.contactAddress}
                                    isInvalid={submitCount > 0 && !!errors.contactAddress}
                                />
                            </Col>
                            <Col>
                                <CommonTextBox
                                    controlId="contactNumber"
                                    label="Contact Number"
                                    type="number"
                                    name="contactNumber"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.contactNumber}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.contactNumber}
                                    isInvalid={submitCount > 0 && !!errors.contactNumber}
                                />
                            </Col>
                            <Col>
                                <CommonTextBox
                                    controlId="contactEmail"
                                    label="Contact Email"
                                    type="email"
                                    name="contactEmail"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.contactEmail}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.contactEmail}
                                    isInvalid={submitCount > 0 && !!errors.contactEmail}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <CommonTextBox
                                    controlId="attendeeSeat"
                                    label="Attendee Seat Capacity"
                                    type="number"
                                    name="attendeeSeat"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.attendeeSeat}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.attendeeSeat}
                                    isInvalid={submitCount > 0 && !!errors.attendeeSeat}
                                />
                            </Col>
                            <Col>
                                <CommonTextBox
                                    controlId="researcherSeat"
                                    label="Researcher Seat Capacity"
                                    type="number"
                                    name="researcherSeat"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    value={values.researcherSeat}
                                    handleOnChange={handleChange}
                                    errorMessage={errors.researcherSeat}
                                    isInvalid={submitCount > 0 && !!errors.researcherSeat}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3 mb-4">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="primaryLabel">
                                        Workshops
                                    </Form.Label>
                                    <div>
                                        <Select
                                            defaultValue={values.workshoplist}
                                            components={animatedComponents}
                                            styles={customStyles}
                                            isMulti
                                            options={props.workshops}
                                            name="workshoplist"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="primaryLabel">
                                        Research Paper Presentations
                                    </Form.Label>
                                    <div>
                                        <Select
                                            defaultValue={values.pesentationlist}
                                            components={animatedComponents}
                                            styles={customStyles}
                                            isMulti
                                            options={props.presentations}
                                            name="pesentationlist"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <span className="form-action-title">Location Details</span>
                        <hr className="horizontal-line" />
                        <Col>
                            <CommonTextBox
                                controlId="locationName"
                                label="Location Name"
                                type="text"
                                name="locationName"
                                classLabel="primaryLabel"
                                classType="primaryTextBox"
                                value={values.locationName}
                                handleOnChange={handleChange}
                                errorMessage={errors.locationName}
                                isInvalid={submitCount > 0 && !!errors.locationName}
                            />
                        </Col>
                        <Col className="mt-3">
                            <CustomTextArea
                                controlId="locationDesc"
                                label="Location Description"
                                name="locationDesc"
                                classLabel="primaryLabel"
                                classType="primaryTextBox"
                                values={values.locationDesc}
                                handleOnChange={handleChange}
                                errorMessage={errors.locationDesc}
                                isInvalid={submitCount > 0 && !!errors.locationDesc}
                            />
                        </Col>
                        <Col className="mt-3">
                            <CommonTextBox
                                controlId="locationLink"
                                label="Location Google Map Link"
                                type="text"
                                name="locationLink"
                                classLabel="primaryLabel"
                                classType="primaryTextBox"
                                value={values.locationLink}
                                handleOnChange={handleChange}
                                errorMessage={errors.locationLink}
                                isInvalid={submitCount > 0 && !!errors.locationLink}
                            />
                        </Col>
                        <Col className="mt-3">
                            <Form.Group>
                                <Form.Label className="form-label-title">
                                    Is Location Images Updating?
                                </Form.Label>
                                <div>
                                    <Switch
                                        onChange={(e) => { setFieldValue('isLocationImageUpdating', e); changeLocationSwitch(e) }}
                                        checked={values.isLocationImageUpdating}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        {locationImages.checked &&
                            <Col className="mt-3 mb-4">
                                <FileUploadBox
                                    isMultiUpload={true}
                                    maxFileSize={5242880}
                                    maxFilesNumber={10}
                                    name='locationImages'
                                    acceptFileTypes={"image/jpeg, image/png, image/jpg"}
                                    viewBoxIcon={<i className="fa fa-picture-o fa-4x" aria-hidden="true"></i>}
                                    uploadFileTopic={'Upload Location Images'}
                                    onlyAcceptedFileTypesLabel={'Only jpeg,png,jpg files will be accepted. Maximum 10 images are accepted'}
                                    maximumFileSizeInMBLabel={'5'}
                                    setFieldValue={setFieldValue}
                                    errorMessage={submitCount > 0 && errors.uploadfiles}
                                    isInvalid={(submitCount > 0 && errors.uploadfiles) ? true : false}
                                />
                            </Col>
                        }

                        <Col>
                            <CustomButton
                                classType="formSubmitBtn"
                                buttonType="submit"
                                label="Submit"
                                buttonDisabled={props.isLoading === true ? true : false}
                                backicon={props.isLoading === true ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                            />
                        </Col>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ConferenceForm;
