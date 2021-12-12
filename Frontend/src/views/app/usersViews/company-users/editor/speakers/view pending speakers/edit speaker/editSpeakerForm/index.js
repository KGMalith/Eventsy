import React,{useState} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col, ProgressBar } from 'react-bootstrap';
import FileUploadBox from '../../../../../../../../../components/upload-box';
import { CustomButton } from '../../../../../../../../../components/buttons';
import { CommonTextBox } from '../../../../../../../../../components/input-text';
import { CustomDropdown } from '../../../../../../../../../components/select';
import Switch from "react-switch";
import './speakerForm.scss';
import { Loader } from '../../../../../../../../../components/loader/loader';

const SpeakerForm = (props) => {
    let [state, setState] = useState({
        checked:false
    });

    const schema = yup.object({
        firstName: yup.string().trim().required('Required'),
        lastName: yup.string().trim().required('Required'),
        affiliation: yup.string().trim().required('Required'),
        twitterLink: yup.string().url('Enter profile URL'),
        facebookLink: yup.string().url('Enter profile URL'),
        linkedinLink: yup.string().url('Enter profile URL'),
    });
    const dropdownValues = [
        {
            label: 'Mr.',
            value: 'Mr.'
        },
        {
            label: 'Ms.',
            value: 'Ms.'
        },
        {
            label: 'Mrs.',
            value: 'Mrs.'
        },
        {
            label: 'Dr.',
            value: 'Dr.'
        },
        {
            label: 'Prof.',
            value: 'Prof.'
        },
        {
            label: 'Hon.',
            value: 'Hon.'
        },
        {
            label: 'St.',
            value: 'St.'
        },
    ];

    const changeSwitch = (checked) => {
        setState({ checked: checked });
    };

    return (
        <div>
            {props.speakerData?
                <Formik
                    validationSchema={schema}
                    enableReinitialize
                    onSubmit={(values) => props.submitForm(values)}
                    initialValues={{ speakerTitle: props.speakerData.speaker_title, firstName: props.speakerData.speaker_first_name, lastName: props.speakerData.speaker_last_name, affiliation: props.speakerData.speaker_affiliation, twitterLink: props.speakerData.speaker_social_media && props.speakerData.speaker_social_media.twitter_link, facebookLink: props.speakerData.speaker_social_media && props.speakerData.speaker_social_media.facebook_link, linkedinLink: props.speakerData.speaker_social_media && props.speakerData.speaker_social_media.linkedin_link, isImageUpdating:false }}>

                    {({
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        submitCount,
                        values
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <CustomDropdown
                                        controlId="speakerTitle"
                                        label="Speaker Title"
                                        dropdownValues={dropdownValues}
                                        value={values.speakerTitle}
                                        name="speakerTitle"
                                        classLabel="primaryLabel"
                                        classType="primaryDropDown"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.speakerTitle}
                                        isInvalid={submitCount > 0 && !!errors.speakerTitle}
                                    />
                                </Col>
                                <Col>
                                    <CommonTextBox
                                        controlId="firstName"
                                        label="Speaker First Name"
                                        type="text"
                                        value={values.firstName}
                                        name="firstName"
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.firstName}
                                        isInvalid={submitCount > 0 && !!errors.firstName}
                                    />
                                </Col>
                                <Col>
                                    <CommonTextBox
                                        controlId="lastName"
                                        label="Speaker Last Name"
                                        value={values.lastName}
                                        type="text"
                                        name="lastName"
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.lastName}
                                        isInvalid={submitCount > 0 && !!errors.lastName}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CommonTextBox
                                        controlId="affiliation"
                                        label="Speaker Affiliation"
                                        value={values.affiliation}
                                        type="text"
                                        name="affiliation"
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.affiliation}
                                        isInvalid={submitCount > 0 && !!errors.affiliation}
                                    />
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label className="form-label-title">
                                            Is Image Updating?
                                        </Form.Label>
                                        <div>
                                            <Switch
                                                onChange={(e) => { setFieldValue('isImageUpdating', e); changeSwitch(e) }}
                                                checked={values.isImageUpdating}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col>
                                    <CommonTextBox
                                        controlId="twitterLink"
                                        label="Twitter Link"
                                        type="text"
                                        value={values.twitterLink}
                                        name="twitterLink"
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.twitterLink}
                                        isInvalid={submitCount > 0 && !!errors.twitterLink}
                                    />
                                </Col>
                                <Col>
                                    <CommonTextBox
                                        controlId="facebookLink"
                                        label="Facebook Link"
                                        type="text"
                                        name="facebookLink"
                                        value={values.facebookLink}
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.facebookLink}
                                        isInvalid={submitCount > 0 && !!errors.facebookLink}
                                    />
                                </Col>
                                <Col>
                                    <CommonTextBox
                                        controlId="linkedinLink"
                                        label="Linkedin Link"
                                        type="text"
                                        name="linkedinLink"
                                        value={values.linkedinLink}
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.linkedinLink}
                                        isInvalid={submitCount > 0 && !!errors.linkedinLink}
                                    />
                                </Col>
                            </Row>
                            {state.checked === true &&
                                <Col className="mt-3 mb-4">
                                <FileUploadBox
                                    isMultiUpload={false}
                                    maxFileSize={5242880}
                                    maxFilesNumber={1}
                                    name='speakerImages'
                                    acceptFileTypes={"image/jpeg, image/png, image/jpg"}
                                    viewBoxIcon={<i className="fa fa-picture-o fa-4x" aria-hidden="true"></i>}
                                    uploadFileTopic={'Upload Speaker Image'}
                                    onlyAcceptedFileTypesLabel={'Only jpeg,png,jpg files will be accepted.'}
                                    maximumFileSizeInMBLabel={'5'}
                                    setFieldValue={setFieldValue}
                                    uploadImage={props.uploadImage}
                                    errorMessage={submitCount > 0 && errors.uploadfiles}
                                    isInvalid={(submitCount > 0 && errors.uploadfiles) ? true : false}
                                />
                                {props.uploadPrecentage > 0 &&
                                    <ProgressBar animated now={props.uploadPrecentage} className="uploadingPrograssBar" />
                                }
                                </Col>
                            }

                            <Col>
                                <CustomButton
                                    classType="formSubmitBtn"
                                    buttonType="submit"
                                    label="Submit"
                                    buttonDisabled={props.isSubmitLoading === true ? true : false}
                                    backicon={props.isSubmitLoading === true ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                                />
                            </Col>
                        </Form>
                    )}
                </Formik>
                :
                <Loader />
            }
        </div>
    )
}

export default SpeakerForm;
