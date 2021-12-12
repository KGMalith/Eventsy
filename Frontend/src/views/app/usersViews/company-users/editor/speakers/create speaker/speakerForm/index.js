import React,{useState} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col, ProgressBar } from 'react-bootstrap';
import FileUploadBox from '../../../../../../../../components/upload-box';
import { CustomButton } from '../../../../../../../../components/buttons';
import { CommonTextBox } from '../../../../../../../../components/input-text';
import { CustomDropdown } from '../../../../../../../../components/select';
import Switch from "react-switch";
import './speakerForm.scss';

const SpeakerForm = (props) => {

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
    
    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, resetForm) => props.submitForm(values, resetForm)}
                initialValues={{ speakerTitle: dropdownValues[0].value}}>

                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    submitCount,
                    resetForm,
                    values
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <CustomDropdown
                                    controlId="speakerTitle"
                                    label="Speaker Title"
                                    dropdownValues={dropdownValues}
                                    value={values.speakerTitle || ''}
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
                                    name="firstName"
                                    value={values.firstName || ''}
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
                                    type="text"
                                    name="lastName"
                                    value={values.lastName || ''}
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
                                    type="text"
                                    value={values.affiliation || ''}
                                    name="affiliation"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    handleOnChange={handleChange}
                                    errorMessage={errors.affiliation}
                                    isInvalid={submitCount > 0 && !!errors.affiliation}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3 mb-3">
                            <Col>
                                <CommonTextBox
                                    controlId="twitterLink"
                                    label="Twitter Link"
                                    type="text"
                                    value={values.twitterLink || ''}
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
                                    value={values.facebookLink || ''}
                                    name="facebookLink"
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
                                    value={values.linkedinLink || ''}
                                    name="linkedinLink"
                                    classLabel="primaryLabel"
                                    classType="primaryTextBox"
                                    handleOnChange={handleChange}
                                    errorMessage={errors.linkedinLink}
                                    isInvalid={submitCount > 0 && !!errors.linkedinLink}
                                />
                            </Col>
                        </Row>
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
                                <ProgressBar animated now={props.uploadPrecentage} className="uploadingPrograssBar"/>
                            }
                            
                        </Col>
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
        </div>
    )
}

export default SpeakerForm
