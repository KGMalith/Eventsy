import React from 'react';
import './addUserForm.scss';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col } from 'react-bootstrap';
import { userTitleValues ,userRoleValues} from '../../../../../../../../components/common-data-array';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { CommonTextBox } from '../../../../../../../../components/input-text';
import { CustomButton } from '../../../../../../../../components/buttons';

function AddUserForm(props) {

    //yup validations
    const schema = yup.object({
        nameTitle: yup.string().trim().required('Required'),
        firstName: yup.string().trim().required('Required'),
        lastName: yup.string().trim().required('Required'),
        email: yup.string().trim().email('Invalid Email').required('Required'),
        role: yup.number().required('Required')
    });
    const animatedComponents = makeAnimated();

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, resetForm) => props.submitForm(values, resetForm)}
                initialValues={{ }}>
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
                                    <Form.Group>
                                        <Form.Label className="primaryLabel">
                                            Title
                                        </Form.Label>
                                        <div>
                                            <Select
                                                defaultValue={values.nameTitle || ''}
                                                components={animatedComponents}
                                                options={userTitleValues}
                                                name="nameTitle"
                                                onChange={(e) => setFieldValue("nameTitle", e.value)}
                                                styles={
                                                    errors.nameTitle === 'Required' ?
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
                                            <p className="errorMsg">{errors.nameTitle}</p>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <CommonTextBox
                                        controlId="firstName"
                                        label="First Name"
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
                                        label="Last Name"
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
                        </Col>
                        <Col>
                            <CommonTextBox
                                controlId="email"
                                label="Email"
                                type="text"
                                name="email"
                                value={values.email || ''}
                                classLabel="primaryLabel"
                                classType="primaryTextBox"
                                handleOnChange={handleChange}
                                errorMessage={errors.email}
                                isInvalid={submitCount > 0 && !!errors.email}
                            />
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="primaryLabel">
                                    User Role
                                </Form.Label>
                                <div>
                                    <Select
                                        defaultValue={values.role || ''}
                                        components={animatedComponents}
                                        options={userRoleValues}
                                        name="role"
                                        onChange={(e) => setFieldValue("role", e.value)}
                                        styles={
                                            errors.role === 'Required' ?
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
                                    <p className="errorMsg">{errors.role}</p>
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

export default AddUserForm;
