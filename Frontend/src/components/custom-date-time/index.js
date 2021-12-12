import React from 'react';
import { Form } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker'
import './dateTime.scss';

function CustomDateTime(props) {
    return (
        <div>
            <Form.Group>
                <Form.Label className="primaryLabel">
                    {props.label}
                </Form.Label>
                <div>
                    <DateTimePicker
                        onChange={props.onChange}
                        value={props.value}
                    />
                </div>
            </Form.Group>
        </div>
    )
}

export default CustomDateTime
