import React, { Component } from 'react';
import { Badge, Card, Col, Container, Image, Table } from 'react-bootstrap';
import { Loader } from '../../../../../../../components/loader/loader';
import { adminGetUserList } from '../../../../../../../services/util/admin/users';
import styles from './viewUsers.module.scss';

export class ViewUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            is_page_loading: false,
            users_list: [],
        }
    }

    componentDidMount() {
        const LoadUsers = async () => {
            this.setState({ is_page_loading: true })
            let respond = await adminGetUserList();
            if (respond.success) {
                this.setState({ is_page_loading: false, users_list: respond.data })
            } else {
                this.setState({ is_page_loading: false })
            }
        };
        LoadUsers();
    }

    render() {
        return (
            <div>
                {this.state.is_page_loading === true ?
                    <div className={styles.loaderComponent}>
                        <Loader />
                    </div>
                    :
                    <Container fluid>
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Card>
                                <Card.Header>
                                    <Card.Title className={styles.cardTitle}>User List</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Table hover responsive bordered>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.users_list).length > 0 && (this.state.users_list).map((value,index)=>(
                                                <tr key={index}>
                                                    <td>
                                                        <Image src={value.user_image ? value.user_image:`${process.env.REACT_APP_BASE_URL}/images/dummy-avatar.png`} className={styles.userImage} fluid />
                                                    </td>
                                                    <td>{value.user_name}</td>
                                                    <td>{value.user_email}</td>
                                                    <td>{ value.user_role === 3 ?'Reviewer': value.user_role === 4 ?'Editor': value.user_role === 5 &&'Admin'}</td>
                                                    <td>{value.is_signup_completed ? <Badge pill bg="success" className={styles.successBadge}>Registerd</Badge> : <Badge pill bg="warning" text="dark" className={styles.warningBadge}>Pending</Badge>}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Container>
                }  
            </div>
        )
    }
}

export default ViewUsers;
