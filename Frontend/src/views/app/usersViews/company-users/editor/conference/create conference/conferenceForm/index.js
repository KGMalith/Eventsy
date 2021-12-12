import React,{useState} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col, ProgressBar } from 'react-bootstrap';
import { CommonTextBox } from '../../../../../../../../components/input-text';
import { CustomTextArea } from '../../../../../../../../components/text-area';
import { CustomButton } from '../../../../../../../../components/buttons';
import { CustomDropdown } from '../../../../../../../../components/select';
import FileUploadBox from '../../../../../../../../components/upload-box';
import CustomMultiDate from '../../../../../../../../components/custom-multi-date';
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
import './conferenceForm.scss';

const ConferenceForm = (props) => {
    //yup validations
    const schema = yup.object({
        conferenceName: yup.string().trim().required('Required'),
        conferenceSubTopic: yup.string().trim().required('Required'),
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

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => props.submitForm(values)}
                initialValues={{ conferenceType: dropValues[0].value, conferenceDays: [new Date(), new Date()]}}>

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
                        <CommonTextBox
                            controlId="conferenceName"
                            label="Conference Name"
                            type="text"
                            name="conferenceName"
                            classLabel="primaryLabel"
                            classType="primaryTextBox"
                            handleOnChange={handleChange}
                            errorMessage={errors.conferenceName}
                            isInvalid={submitCount > 0 && !!errors.conferenceName}
                        />
                        <Row className="mt-3">
                            <Col>
                                <CommonTextBox
                                    controlId="conferenceSubTopic"
                                    label="Conference Sub Topic"
                                    type="text"
                                    name="conferenceSubTopic"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    handleOnChange={handleChange}
                                    errorMessage={errors.conferenceSubTopic}
                                    isInvalid={submitCount > 0 && !!errors.conferenceSubTopic}
                                />
                            </Col>
                            <Col>
                                <CustomDropdown
                                    controlId="conferenceType"
                                    value={values.conferenceType}
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
                                    onChange={(e) => { setFieldValue("conferenceDays", e)}}
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
                                        components={animatedComponents}
                                        styles={customStyles}
                                        isMulti
                                        options={props.speakers}
                                        onChange={(e) => setFieldValue('speakerlist', e)}
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
                                handleOnChange={handleChange}
                                errorMessage={errors.conferenceAbout}
                                isInvalid={submitCount > 0 && !!errors.conferenceAbout}
                            />
                        </Col>
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
                                uploadImage={props.uploadConferenceImages}
                                errorMessage={submitCount > 0 && errors.uploadfiles}
                                isInvalid={(submitCount > 0 && errors.uploadfiles) ? true : false}
                            />
                            {props.uploadPrecentageConference > 0 &&
                                <ProgressBar animated now={props.uploadPrecentageConference} className="uploadingPrograssBar" />
                            }
                        </Col>
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
                                            components={animatedComponents}
                                            styles={customStyles}
                                            isMulti
                                            options={props.workshops}
                                            onChange={(e) => setFieldValue('workshoplist',e)}
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
                                            components={animatedComponents}
                                            styles={customStyles}
                                            isMulti
                                            options={props.presentations}
                                            onChange={(e) => setFieldValue('pesentationlist', e)}
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
                                handleOnChange={handleChange}
                                errorMessage={errors.locationLink}
                                isInvalid={submitCount > 0 && !!errors.locationLink}
                            />
                        </Col>
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
                                uploadImage={props.uploadLocationImages}
                                errorMessage={submitCount > 0 && errors.uploadfiles}
                                isInvalid={(submitCount > 0 && errors.uploadfiles) ? true : false}
                            />
                            {props.uploadPrecentageLocation > 0 &&
                                <ProgressBar animated now={props.uploadPrecentageLocation} className="uploadingPrograssBar" />
                            }
                        </Col>
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
