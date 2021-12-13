import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from './viewWorkshop.module.scss';
import moment from 'moment';
import { getAllWorkshops } from '../../../../../../../services/util/editor/workshops';
import { Loader } from '../../../../../../../components/loader/loader';

export class ViewWorkshops extends Component {
    constructor(props) {
        super(props)

        this.showWorkshop = this.showWorkshop.bind(this);
        this.state = {
            is_page_loading: false,
            presentation_data_set: [],
        }
    }

    showWorkshop(id) {
        this.props.history.push(`/app/editor-view-workshops/${id}`);
    }

    componentDidMount() {
        let loadData = async () => {
            this.setState({ is_page_loading: true });
            let respond = await getAllWorkshops();
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
                            {this.state.presentation_data_set && this.state.presentation_data_set.length > 0 &&
                                this.state.presentation_data_set.map((values, idx) => (
                                    <div className="col-md-6" key={idx} onClick={() => this.showWorkshop(values.workshop_id)}>
                                        <div className={`card ${styles.workshopCard}`}>
                                            <div className="card-body">
                                                <div className={styles.eventTitle}>
                                                    <h3 className={styles.title}>{values.workshop_name}</h3>
                                                </div>
                                                <p className={styles.eventDesc}>
                                                    {values.workshop_description}
                                                </p>
                                                <div className="row mt-4">
                                                    <div className="col">
                                                        <div>
                                                            <span className={styles.IconBox}>
                                                                <i class="bi bi-mic-fill"></i>
                                                            </span>
                                                            <div className={styles.eventDetailsBox}>
                                                                <span className={styles.eventLabel}>Speakers</span>
                                                                {(values.workshop_speakers).map((val, id) => (
                                                                    <p className={styles.eventValue} key={id}>{val}</p>
                                                                ))
                                                                }
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
                                                                <p className={styles.eventValue}>{moment(values.workshop_date_and_time).format('llll')}</p>
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

export default ViewWorkshops;
