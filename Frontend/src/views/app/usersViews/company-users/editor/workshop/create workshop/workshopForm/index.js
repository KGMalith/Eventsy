import React,{useState} from 'react';
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
        workshopConductor: yup.string().trim().required('Required'),
        speaker: yup.array().of(yup.string()).required('Required')
    });
    const animatedComponents = makeAnimated();

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
                onSubmit={(values, resetForm) => props.submitForm(values, resetForm)}
                initialValues={{ dateTime: new Date()}}>

                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    resetForm,
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
                                        components={animatedComponents}
                                        styles={customStyles}
                                        isMulti
                                        options={props.speakersList}
                                        name="workshoplist"
                                        onChange={(e) => setFieldValue("speaker", e)}
                                    />
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
                                        components={animatedComponents}
                                        styles={customStyles}
                                        options={props.conductorsList}
                                        name="workshopConductor"
                                        onChange={(e) => setFieldValue("workshopConductor", e)}
                                    />
                                </div>
                            </Form.Group>
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

export default WorkshopForm;
