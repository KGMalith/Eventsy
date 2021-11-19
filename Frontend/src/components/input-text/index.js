import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './input-text.module.scss';

export const CommonTextBox = (props) => {
    return (
        <div>
            <Form.Group controlId={props.controlId}>
                {props.label &&
                    <Form.Label
                        className={`
                            ${props.classLabel === 'defaultLabel' ? styles.defaultLabel : ''}
                            ${props.classLabel === 'primaryLabel' ? styles.primaryLabel : ''}
                            `}>
                        {props.label}
                    </Form.Label>
                }
                <Form.Control
                    className={`
                            ${props.classType === 'defaultTextBox' ? styles.defaultTextBox : ''}
                            ${props.classType === 'primaryTextBox' ? styles.primaryTextBox : ''}
                        `}
                    placeholder={props.placeholder}
                    onChange={props.handleOnChange}
                    name={props.name}
                    type={props.type}
                    isInvalid={props.isInvalid}
                    value={props.value}
                    disabled={props.disabled}
                    maxLength={props.maxlength}
                    readOnly={props.readOnly}
                />
                {props.errorMessage &&
                    <Form.Control.Feedback type="invalid" className={styles.errorMsg}>
                        {props.errorMessage}
                    </Form.Control.Feedback>
                }
            </Form.Group>
        </div>
    )
};

CommonTextBox.defaultProps = {
    classType: 'defaultTextBox',
    classLabel: 'defaultLabel'
};

