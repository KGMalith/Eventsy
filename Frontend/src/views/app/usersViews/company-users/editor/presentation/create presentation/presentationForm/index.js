import React,{useState} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import CustomDateTime from '../../../../../../../../components/custom-date-time';
import makeAnimated from 'react-select/animated';
import './presentationForm.scss';
import { CommonTextBox } from '../../../../../../../../components/input-text';
import { CustomTextArea } from '../../../../../../../../components/text-area';
import { CustomButton } from '../../../../../../../../components/buttons';

const PresentationForm = (props) => {
    const animatedComponents = makeAnimated();
    //yup validations
    const schema = yup.object({
        topic: yup.string().trim().required('Required'),
        presentationDesc: yup.string().trim().required('Required'),
        dateTime: yup.string().trim().required('Required'),
    });
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
                enableReinitialize
                onSubmit={(values, resetForm) => props.submitForm(values, resetForm)}
                initialValues={{ dateTime: new Date()}}>

                {({
                    errors,
                    handleChange,
                    resetForm,
                    setFieldValue,
                    handleSubmit,
                    submitCount,
                    values
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Col>
                            <Row>
                                <Col>
                                    <CommonTextBox
                                        controlId="topic"
                                        label="Presentation Topic"
                                        type="text"
                                        name="topic"
                                        value={values.topic || ''}
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.topic}
                                        isInvalid={submitCount > 0 && !!errors.topic}
                                    />
                                </Col>
                                <Col>
                                    <CustomDateTime
                                        label="Presentation Date & Time"
                                        onChange={(e) => { setFieldValue('dateTime', e) }}
                                        value={values.dateTime || ''}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mt-3">
                            <Form.Group>
                                <Form.Label className="primaryLabel">
                                    Speaker
                                </Form.Label>
                                <div>
                                    <Select
                                        components={animatedComponents}
                                        styles={customStyles}
                                        options={props.speakersList}
                                        name="speaker"
                                        onChange={(e) => setFieldValue("speaker", e.value)}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col className="mt-3">
                            <CustomTextArea
                                controlId="presentationDesc"
                                label="Presentation Description"
                                name="presentationDesc"
                                values={values.presentationDesc || ''}
                                classLabel="primaryLabel"
                                classType="primaryTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.presentationDesc}
                                isInvalid={submitCount > 0 && !!errors.presentationDesc}
                            />
                        </Col>
                        <Col className="mt-3">
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

export default PresentationForm;
