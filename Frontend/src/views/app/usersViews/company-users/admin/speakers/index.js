import React, { Component } from 'react'
import { getPendingSpeakers } from '../../../../../../services/util/editor/speakers';
import styles from './viewRequestedSpeakers.module.scss';

export class ViewRequestedSpeakers extends Component {
    constructor(props) {
        super(props)
        this.approveSpeaker = this.approveSpeaker.bind(this);
        this.rejectSpeaker = this.rejectSpeaker.bind(this);
        this.state = {
            is_page_loading: false,
            all_speakers: []
        }
    }

    componentDidMount() {
        const LoadSpeakers = async () => {
            this.setState({ is_page_loading: true })
            let respond = await getPendingSpeakers();
            if (respond.success === true) {
                this.setState({ is_page_loading: false, all_speakers: respond.data })
            } else {
                this.setState({ is_page_loading: false })
            }
        };
        LoadSpeakers();
    }

    approveSpeaker(id) {
    }

    rejectSpeaker(id) {
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default ViewRequestedSpeakers;
