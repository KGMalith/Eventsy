import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './select.module.scss';

export const CustomDropdown = (props) => {
    let values = props.dropdownValues;
    return (
        <div>
            <Form.Group controlId={props.controlId}>
                <Form.Label
                    className={`
                        ${props.classLabel === 'defaultLabel' ? styles.defaultLabel : ''}
                        ${props.classLabel === 'primaryLabel' ? styles.primaryLabel : ''}
                    `}>
                    {props.label}
                </Form.Label>
                <Form.Control as="select" disabled={props.disabled} readOnly={props.readOnly} onFocus={props.onFocus} name={props.name} onChange={props.handleOnChange} isInvalid={props.isInvalid} value={props.value}
                    className={`
                        ${props.classType === 'defaultDropDown' ? styles.defaultDropDown : ''}
                        ${props.classType === 'primaryDropDown' ? styles.primaryDropDown : ''}
                    `}
                >
                    {
                        values.map((value,index) => (
                            <option key={value.value} value={value.value} defaultValue={index === 0?true:false}>{value.label}</option>
                        ))
                    }
                </Form.Control>
                <p className={styles.errorMessage}>{props.errorMessage}</p>
            </Form.Group>
        </div>
    )
}

CustomDropdown.defaultProps = {
    classType: 'defaultDropDown',
    classLabel: 'defaultLabel',
};
