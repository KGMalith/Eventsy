import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CommonTextBox } from '../../../../components/input-text';
import { CustomButton } from '../../../../components/buttons';

export default function EmailVerifyForm(props) {
    //yup validations
    const schema = yup.object({
        forgotPassEmail: yup.string().email('Invalid Email').trim().required('Required')
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
                    submitCount
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <div>
                            <CommonTextBox
                                controlId="forgotPassEmail"
                                label="Email"
                                type="email"
                                name="forgotPassEmail"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.forgotPassEmail}
                                isInvalid={submitCount > 0 && !!errors.forgotPassEmail}
                            />
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <CustomButton
                                    classType="regularCardBtn"
                                    buttonType="submit"
                                    label="SEND VERIFICATION CODE"
                                    buttonDisabled={props.isLoading ? true : false}
                                    backicon={props.isLoading ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                                />
                            </div>
                        </div>

                    </form>
                )}
            </Formik>
        </div>
    )
}
