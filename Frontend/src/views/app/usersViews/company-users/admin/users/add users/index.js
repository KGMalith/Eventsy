import React, { Component } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { adminAddNewUser } from '../../../../../../../services/util/admin/users';
import AddUserForm from './addUserForm';
import styles from './addUsers.module.scss';

export class AddUsers extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.state = {
            isSubmitLoading: false
        }
    }

    async submitForm(value, { resetForm }) {
        this.setState({ isSubmitLoading: true });
       
        let data = {
            user_email: value.email,
            user_name_title: value.nameTitle,
            user_first_name: value.firstName,
            user_last_name: value.lastName,
            user_role: value.role
        };

        let respond = await adminAddNewUser(data);
        if (respond.success) {
            resetForm({});
            this.setState({ isSubmitLoading: false });
            this.props.history.go(0);
        } else {
            this.setState({ isSubmitLoading: false });
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Col sm={{ span: 10, offset: 1 }}>
                        <Card>
                            <Card.Header>
                                <Card.Title className={styles.cardTitle}>Add New User</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <AddUserForm submitForm={this.submitForm} isLoading={this.state.isSubmitLoading} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default AddUsers;
