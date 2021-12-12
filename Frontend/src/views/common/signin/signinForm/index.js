import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CommonTextBox } from '../../../../components/input-text';
import { CustomButton } from '../../../../components/buttons';
import { Link } from 'react-router-dom';
import './signinForm.scss';


export default function SigninForm(props) {
    //yup validations
    const schema = yup.object({
        signinEmail: yup.string().email('Invalid Email').trim().required('Required'),
        signinPassword: yup.string().trim().required('Required')
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
                        <div className="row mt-4">
                            <div className="col">
                                <CustomButton
                                    classType="regularCardBtn"
                                    buttonType="submit"
                                    label="SIGNIN"
                                    buttonDisabled={props.isLoading? true : false}
                                    backicon={props.isLoading? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : null}
                                />
                            </div>
                            <div className="col forgot-Password-Col">
                                <Link to="/forgotpassword">Forgot Password?</Link>
                            </div>
                        </div>
                        <div className="col mt-3">
                            <p className="message">Don't have an Account?&nbsp;<Link to="/signup" className="signup-link">Signup</Link></p>
                        </div>

                    </form>
                )}
            </Formik>

        </div>
    )
}
