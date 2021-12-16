import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import  './workshopForm.scss';
import CustomDateTime from '../../../../../../../../components/custom-date-time';
import { CommonTextBox } from '../../../../../../../../components/input-text';
import { CustomTextArea } from '../../../../../../../../components/text-area';
import makeAnimated from 'react-select/animated';
import { CustomButton } from '../../../../../../../../components/buttons';

const WorkshopForm = (props) => {
    //yup validations
    const schema = yup.object({
        workshopName: yup.string().trim().required('Required'),
        workshopDesc: yup.string().trim().required('Required'),
        workshopConductor: yup.string().required('Required'),
        speaker: yup.array().of(yup.object().shape({ label: yup.string(), value: yup.string()})).required('Required').nullable()
    });
    const animatedComponents = makeAnimated();


    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, resetForm) => props.submitForm(values, resetForm)}
                initialValues={{ dateTime: new Date()}}>
                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    submitCount,
                    values
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Col>
                            <Row>
                                <Col>
                                    <CommonTextBox
                                        controlId="workshopName"
                                        label="Workshop Name"
                                        type="text"
                                        name="workshopName"
                                        value={values.workshopName || ''}
                                        classLabel="primaryLabel"
                                        classType="primaryTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.workshopName}
                                        isInvalid={submitCount > 0 && !!errors.workshopName}
                                    />
                                </Col>
                                <Col>
                                    <CustomDateTime
                                        label="Workshop Date & Time"
                                        onChange={(e) => { setFieldValue('dateTime', e) }}
                                        value={values.dateTime || ''}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mt-3">
                            <CustomTextArea
                                controlId="workshopDesc"
                                label="Workshop Description"
                                name="workshopDesc"
                                classLabel="primaryLabel"
                                values={values.workshopDesc || ''}
                                classType="primaryTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.workshopDesc}
                                isInvalid={submitCount > 0 && !!errors.workshopDesc}
                            />
                        </Col>
                        <Col className="mt-3">
                            <Form.Group>
                                <Form.Label className="primaryLabel">
                                    Speakers
                                </Form.Label>
                                <div>
                                    <Select
                                        defaultValue={values.speaker || ''}
                                        components={animatedComponents}
                                        isMulti
                                        options={props.speakersList}
                                        name="speaker"
                                        onChange={(e) => setFieldValue("speaker", e)}
                                        styles={
                                            errors.speaker === 'Required' ?
                                                {
                                                    control: (base, state) => ({
                                                        ...base,
                                                        '&:hover': { borderColor: '#dc3545' }, // border style on hover
                                                        border: '1px solid #dc3545', // default border color
                                                        borderRadius: '0.25rem',
                                                        boxShadow: 'none', // no box-shadow
                                                    })
                                                }
                                                :
                                                {
                                                    control: (base, state) => ({
                                                        ...base,
                                                        '&:hover': { borderColor: '#86b7fe' },
                                                        '&:focus': { borderColor: '#86b7fe' }, // border style on hover
                                                        border: '1px solid var(--app-primary-border-color)', // default border color
                                                        borderRadius: '0.25rem',
                                                        boxShadow: 'none', // no box-shadow
                                                    })
                                                }
                                        }
                                    />
                                    <p className="errorMsg">{errors.speaker}</p>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col className="mt-3">
                            <Form.Group>
                                <Form.Label className="primaryLabel">
                                    Requested Workshop Conductor
                                </Form.Label>
                                <div>
                                    <Select
                                        defaultValue={values.workshopConductor ||''}
                                        components={animatedComponents}
                                        options={props.conductorsList}
                                        name="workshopConductor"
                                        onChange={(e) => setFieldValue("workshopConductor", e.value)}
                                        styles={
                                            errors.workshopConductor === 'Required' ?
                                                {
                                                    control: (base, state) => ({
                                                        ...base,
                                                        '&:hover': { borderColor: '#dc3545' }, // border style on hover
                                                        border: '1px solid #dc3545', // default border color
                                                        borderRadius: '0.25rem',
                                                        boxShadow: 'none', // no box-shadow
                                                    })
                                                }
                                                :
                                                {
                                                    control: (base, state) => ({
                                                        ...base,
                                                        '&:hover': { borderColor: '#86b7fe' },
                                                        '&:focus': { borderColor: '#86b7fe' }, // border style on hover
                                                        border: '1px solid var(--app-primary-border-color)', // default border color
                                                        borderRadius: '0.25rem',
                                                        boxShadow: 'none', // no box-shadow
                                                    })
                                                }
                                        }
                                    />
                                    <p className="errorMsg">{errors.workshopConductor}</p>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col className="mt-3">
                            <CustomButton
                                classType="formSubmitBtn"
                                buttonType="submit"
                                label="Submit"
                                buttonDisabled={props.isLoading ? true : false}
                                backicon={props.isLoading ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                            />
                        </Col>
                    </Form>
                    )}
            </Formik>
        </div>
    )
}

export default WorkshopForm;
