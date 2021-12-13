import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './signupForm.scss';
import { CommonTextBox } from '../../../../components/input-text';
import { CustomButton } from '../../../../components/buttons';
import { CustomDropdown } from '../../../../components/select';
import { userTitleValues } from '../../../../components/common-data-array';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FileUploadBox from '../../../../components/upload-box';


export default function SignupForm(props) {
    let [userType, setUserType] = useState(0);

    //yup validations
    const schema = yup.object({
        firstName: yup.string().trim().required('Required'),
        lastName: yup.string().trim().required('Required'),
        signinEmail: yup.string().email('Invalid Email').trim().required('Required'),
        signinPassword: yup.string().trim().required('Required'),
        mobile: yup.string().required('Required'),
        affiliation: yup.string().test('check affiliation', 'Required', function (value) {
            if (userType === 1) {
                if (!value) {
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        }),
        uploadfiles: yup.array().test('check upload file', 'Required', function (value) {
            if (userType === 1 || userType === 2) {
                if (!value || value.length === 0) {
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        })
    });

    const changeUserType = (value) => {
        setUserType(value)
    }

    const deleteUploadedFiles = (files, index, setFieldValue) => {
        files.splice(index, 1);
        setFieldValue('uploadfiles', files);
        props.setURL({ fileURL: '' });
    }

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => props.submitForm(values)}
                initialValues={{ userType: userType, nameTitle: userTitleValues[0].value, uploadfiles: [] }}>

                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    submitCount,
                    values
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div key={`inline-radio`}>
                            <p className="formLabel">I'm a</p>
                            <Form.Check
                                inline
                                label="Attendee"
                                name="userType"
                                type="radio"
                                checked={values.userType === 0 ? true : false}
                                onChange={(e) => { setFieldValue('userType', 0); changeUserType(0) }}
                                className="radioBtns"
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                inline
                                label="Researcher"
                                name="userType"
                                type="radio"
                                checked={values.userType === 1 ? true : false}
                                className="radioBtns"
                                onChange={(e) => { setFieldValue('userType', 1); changeUserType(1) }}
                                id={`inline-radio-2`}
                            />
                            <Form.Check
                                inline
                                label="Workshop Conductor"
                                name="userType"
                                checked={values.userType === 2 ? true : false}
                                className="radioBtns"
                                onChange={(e) => { setFieldValue('userType', 2); changeUserType(2) }}
                                type="radio"
                                id={`inline-radio-3`}
                            />
                        </div>
                        <Row className="mt-4">
                            <Col lg={2}>
                                <CustomDropdown
                                    controlId="nameTitle"
                                    classLabel="defaultLabel"
                                    label="Title"
                                    name="nameTitle"
                                    value={values.nameTitle}
                                    dropdownValues={userTitleValues}
                                    handleOnChange={handleChange}
                                />
                            </Col>
                            <Col lg={5}>
                                <CommonTextBox
                                    controlId="firstName"
                                    label="First Name"
                                    type="text"
                                    name="firstName"
                                    classType="defaultTextBox"
                                    handleOnChange={handleChange}
                                    errorMessage={errors.firstName}
                                    isInvalid={submitCount > 0 && !!errors.firstName}
                                />
                            </Col>
                            <Col lg={5}>
                                <CommonTextBox
                                    controlId="lastName"
                                    label="Last Name"
                                    type="text"
                                    name="lastName"
                                    classType="defaultTextBox"
                                    handleOnChange={handleChange}
                                    errorMessage={errors.lastName}
                                    isInvalid={submitCount > 0 && !!errors.lastName}
                                />
                            </Col>
                        </Row>
                        <div className="mt-2">
                            <CommonTextBox
                                controlId="signinEmail"
                                label="Email"
                                type="email"
                                name="signinEmail"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.signinEmail}
                                isInvalid={submitCount > 0 && !!errors.signinEmail}
                            />
                        </div>
                        <div className="mt-4">
                            <Form.Group>
                                <Form.Label className="formLabel">
                                    Mobile Number
                                </Form.Label>
                                <PhoneInput
                                    country='lk'
                                    onChange={(value, country, e, formattedValue) => { setFieldValue('mobile', formattedValue) }}
                                    isValid={(submitCount > 0 && errors.mobile) ? false : true}
                                    inputClass={(submitCount > 0 && errors.mobile) ? `inputboxNumberError` : `inputboxNumber`}
                                    buttonClass="dropdownNumber"
                                />
                                {submitCount > 0 &&
                                    <p className="numberErrorMsg">{errors.mobile}</p>
                                }
                            </Form.Group>
                        </div>
                        {userType === 1 &&
                            <div className="mt-4">
                                <CommonTextBox
                                    controlId="affiliation"
                                    label="Affiliated University"
                                    type="text"
                                    name="affiliation"
                                    classType="defaultTextBox"
                                    handleOnChange={handleChange}
                                    errorMessage={errors.affiliation}
                                    isInvalid={submitCount > 0 && !!errors.affiliation}
                                />
                            </div>
                        }
                        <div className="mt-4">
                            <CommonTextBox
                                controlId="signinPassword"
                                label="Password"
                                type="password"
                                name="signinPassword"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.signinPassword}
                                isInvalid={submitCount > 0 && !!errors.signinPassword}
                            />
                        </div>
                        {(userType === 1 || userType === 2) &&
                            <div className="mt-4">

                                <FileUploadBox
                                    isMultiUpload={false}
                                    maxFileSize={10485760}
                                    acceptFileTypes={"application/pdf"}
                                    viewBoxIcon={<i className="fa fa-file-pdf-o fa-4x" aria-hidden="true"></i>}
                                    uploadFileTopic={userType === 1 ? 'Upload Research Paper' : userType === 2 ? 'Upload Workshop Proposal' : ''}
                                    onlyAcceptedFileTypesLabel={'Only pdf files will be accepted'}
                                    maximumFileSizeInMBLabel={'10'}
                                    setFieldValue={setFieldValue}
                                    uploadFiles={props.uploadFiles}
                                    userType={userType}
                                    name='uploadfiles'
                                    errorMessage={submitCount > 0 && errors.uploadfiles}
                                    isInvalid={(submitCount > 0 && errors.uploadfiles) ? true : false}
                                />
                                <div>
                                    {
                                        values.uploadfiles && values.uploadfiles.map((file, index) => (
                                            <Alert key={index} variant={'light'} className='successAlert'>
                                                <Row>
                                                    <Col>
                                                        {file.name}
                                                    </Col>
                                                    {props.isFilesUploading ?
                                                        <Col>
                                                            <span className='float-end'>{props.uploadPrecentage + '%'}&nbsp;&nbsp;&nbsp;<i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i></span>
                                                        </Col>
                                                        :
                                                        <Col sm={2} className='deleteIcon'>
                                                            <i className="fa fa-trash-o" aria-hidden="true" onClick={() => deleteUploadedFiles(values.uploadfiles, index, setFieldValue)}></i>
                                                        </Col>
                                                    }
                                                </Row>
                                            </Alert>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        <Row className="mt-4">
                            <Col>
                                <CustomButton
                                    classType="regularCardBtn"
                                    buttonType="submit"
                                    label="SIGNUP"
                                    buttonDisabled={props.isLoading === true ? true : false}
                                    backicon={props.isLoading === true ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                                />
                            </Col>
                        </Row>
                        <Col className="mt-3">
                            <p className="message">Already have an Account?&nbsp;<Link to="/signin" className="signup-link">Signin</Link></p>
                        </Col>

                    </Form>
                )}
            </Formik>

        </div>
    )
}
