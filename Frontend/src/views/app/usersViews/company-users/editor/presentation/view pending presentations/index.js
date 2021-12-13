import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { getPendingPresentations } from '../../../../../../../services/util/editor/presentations';
import styles from './viewPendingPresentations.module.scss';
import moment from 'moment';
import { Loader } from '../../../../../../../components/loader/loader';

export class ViewPendingPresentations extends Component {
    constructor(props) {
        super(props)

        this.showPresentation = this.showPresentation.bind(this);
        this.state = {
            is_page_loading: false,
            presentation_data_set: [],
        }
    }

    showPresentation(id) {
        this.props.history.push(`/app/editor-view-pending-presentations/${id}`);
    }

    componentDidMount() {
        let loadData = async () => {
            this.setState({ is_page_loading: true });
            let respond = await getPendingPresentations();
            if (respond.success === true) {
                this.setState({ presentation_data_set: respond.data, is_page_loading: false })
            } else {
                this.setState({ is_page_loading: false });
            }
        }
        loadData();
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
                        <Row>
                            {this.state.presentation_data_set && ((this.state.presentation_data_set).length > 0) &&
                                (this.state.presentation_data_set).map((result, idx) => (
                                    <div className="col-md-6" key={idx} onClick={() => this.showPresentation(result.presentation_id)}>
                                        <div className={`card ${styles.presentationCard}`}>
                                            <div className="card-body">
                                                <div className={styles.eventTitle}>
                                                    <h3 className={styles.title}>{result.presentation_topic}</h3>
                                                </div>
                                                <p className={styles.eventDesc}>
                                                    {result.presentation_description}
                                                </p>
                                                <div className="row mt-4">
                                                    <div className="col">
                                                        <div>
                                                            <span className={styles.IconBox}>
                                                                <i class="bi bi-mic-fill"></i>
                                                            </span>
                                                            <div className={styles.eventDetailsBox}>
                                                                <span className={styles.eventLabel}>Speaker</span>
                                                                <p className={styles.eventValue}>{result.presentation_conductor}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div>
                                                            <span className={styles.IconBox}>
                                                                <i class="bi bi-clock"></i>
                                                            </span>
                                                            <div className={styles.eventDetailsBox}>
                                                                <span className={styles.eventLabel}>Event Time</span>
                                                                <p className={styles.eventValue}>{moment(result.presentation_date_and_time).format('llll')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Row>
                    </Container>
                }
            </div>
        )
    }
}

export default ViewPendingPresentations;
