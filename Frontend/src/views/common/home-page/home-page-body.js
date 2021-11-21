import React, { Component } from 'react';
import Hero from './hero';
import About from './about';
import Speakers from './speakers';
import Gallery from './gallery';
import Fees from './fees';
import Venue from './venue';
import Contact from './contact';

export class HomePageBody extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Hero bodyData={this.props.bodyData}/>
                <About bodyData={this.props.bodyData} />
                {this.props.bodyData && (this.props.bodyData.key_note_speakers).length > 0 &&
                    <Speakers bodyData={this.props.bodyData} />
                }
                {this.props.bodyData && this.props.bodyData.conference_images && (this.props.bodyData.conference_images).length > 0 &&
                    <Gallery bodyData={this.props.bodyData} />
                }
                <Fees bodyData={this.props.bodyData} />
                <Venue bodyData={this.props.bodyData} />
                <Contact bodyData={this.props.bodyData} />
            </div>
        )
    }
}

export default HomePageBody;
