import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form ,Row,Col} from 'react-bootstrap';
import {CommonTextBox} from '../../../../../components/input-text';
import {CustomTextArea} from '../../../../../components/text-area';
import {CustomButton} from '../../../../../components/buttons';

export default function ContactForm(props) {
    //yup validations
    const schema = yup.object({
        contactName: yup.string().trim().required('Required'),
        contactEmail: yup.string().email('Invalid Email').trim().required('Required'),
        contactSubject: yup.string().trim().required('Required'),
        contactMessage: yup.string().trim().required('Required'),
    });

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, resetForm) => props.submitForm(values, resetForm)}
                initialValues={{}}>

                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    submitCount,
                    resetForm,
                    values
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Col>
                            <Row>
                                <Col>
                                    <CommonTextBox
                                        controlId="contactName"
                                        placeholder="Your Name"
                                        type="text"
                                        value={values.contactName || ''}
                                        name="contactName"
                                        classType="defaultTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.contactName}
                                        isInvalid={submitCount > 0 && !!errors.contactName}
                                    />
                                </Col>
                                <Col>
                                    <CommonTextBox
                                        controlId="contactEmail"
                                        placeholder="Your Email"
                                        type="email"
                                        value={values.contactEmail || ''}
                                        name="contactEmail"
                                        classType="defaultTextBox"
                                        handleOnChange={handleChange}
                                        errorMessage={errors.contactEmail}
                                        isInvalid={submitCount > 0 && !!errors.contactEmail}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mt-3">
                            <CommonTextBox
                                controlId="contactSubject"
                                placeholder="Subject"
                                type="text"
                                value={values.contactSubject || ''}
                                name="contactSubject"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.contactSubject}
                                isInvalid={submitCount > 0 && !!errors.contactSubject}
                            />
                        </Col>
                        <Col className="mt-3">
                            <CustomTextArea
                                controlId="contactMessage"
                                placeholder="Message"
                                values={values.contactMessage || ''}
                                name="contactMessage"
                                handleOnChange={handleChange}
                                errorMessage={errors.contactMessage}
                                isInvalid={submitCount > 0 && !!errors.contactMessage}
                            />
                        </Col>
                        
                        <div className="text-center mt-3">
                            <CustomButton
                                classType="feeCardBtn"
                                buttonType="submit"
                                label="Send Message"
                                buttonDisabled={props.isLoading === true ? true : false}
                                backicon={props.isLoading === true ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
