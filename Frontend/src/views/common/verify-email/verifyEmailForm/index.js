import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col } from 'react-bootstrap';
import './verifyEmailForm.scss';
import { CommonTextBox } from '../../../../components/input-text';
import { CustomButton } from '../../../../components/buttons';


export default function EmailVerifyForm(props) {

    //yup validations
    const schema = yup.object({
        code: yup.string().test('Digits only', 'The field should have digits only', (value) => /^\d+$/.test(value)).required('Required')
    });

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => props.submitForm(values)}
                initialValues={{}}>

                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    submitCount,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <CommonTextBox
                                controlId="code"
                                label="Verification Code"
                                type="text"
                                name="code"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.code}
                                isInvalid={submitCount > 0 && !!errors.code}
                            />
                        </div>
                        <Row className="mt-4">
                            <Col>
                                <CustomButton
                                    classType="regularCardBtn"
                                    buttonType="submit"
                                    label="VERIFY"
                                    buttonDisabled={props.isLoading === true ? true : false}
                                    backicon={props.isLoading === true ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                                />
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>

        </div>
    )
}
