import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Form } from 'react-bootstrap';
import './multidate.scss';

export default function CustomMultiDate(props) {
    return (
        <div>
            <Form.Group>
                <Form.Label className="primaryLabel">
                    {props.label}
                </Form.Label>
                <div>
                    <DateRangePicker
                        onChange={props.onChange}
                        value={props.value}
                    />
                </div>
            </Form.Group>
        </div>
    )
}
