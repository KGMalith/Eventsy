import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './text-area.module.scss';

export const CustomTextArea = (props) => {
    return (
        <div>
            <Form.Group controlId={props.controlId}>
                {props.label &&
                    <Form.Label 
                    className={`
                            ${props.classLabel === 'textareaLabel' ? styles.textareaLabel : ''}
                            ${props.classLabel === 'primaryLabel' ? styles.primaryLabel : ''}
                    `}>
                        {props.label}
                    </Form.Label>
                }
                <Form.Control as="textarea" name={props.name} placeholder={props.placeholder} value={props.values} onChange={props.handleOnChange} rows={3}  isInvalid={props.isInvalid} maxLength={props.maxLength} 
                    className={`
                            ${props.classType === 'textareaBox' ? styles.textareaBox : ''}
                            ${props.classType === 'primaryTextBox' ? styles.primaryTextBox : ''}
                        `}
                />
                <Form.Control.Feedback type="invalid">{props.errorMessage}</Form.Control.Feedback>
                {props.maxLength &&
                    <Form.Text className={styles.remainingCount}><b>{props.remainingCount}</b>/{props.maxLength}</Form.Text>
                }

            </Form.Group>
        </div>
    )
}

CustomTextArea.defaultProps = {
    classType: 'textareaBox',
    classLabel: 'defaultLabel'
};
