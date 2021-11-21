import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CommonTextBox } from '../../../../components/input-text';
import { CustomButton } from '../../../../components/buttons';

export default function PasswordResetForm(props) {
    //yup validations
    const schema = yup.object({
        verificationCode: yup.number().typeError('Only Numbers are Accepted').required('Verification Code Required'),
        password: yup.string().required('New Password Required')
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
                                controlId="verificationCode"
                                label="Code"
                                type="number"
                                name="verificationCode"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.verificationCode}
                                isInvalid={submitCount > 0 && !!errors.verificationCode}
                            />
                        </div>
                        <div className="mt-4">
                            <CommonTextBox
                                controlId="password"
                                label="New Password"
                                type="password"
                                name="password"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.password}
                                isInvalid={submitCount > 0 && !!errors.password}
                            />
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <CustomButton
                                    classType="regularCardBtn"
                                    buttonType="submit"
                                    label="RESET PASSWORD"
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
