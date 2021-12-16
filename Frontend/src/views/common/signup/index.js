import React, { Component } from 'react';
import {signUp, uploadResearchPaperFile, uploadWorkshopProposalFile} from '../../../services/util/auth';
import Footer from '../commonViews/footer';
import Header from '../commonViews/header';
import styles from './signup.module.scss';
import SignupForm from './signupForm';
import { withRouter } from 'react-router-dom';

export class Signup extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);

        this.state = {
            isFormLoading: false,
            isSignupCompleted: false,
            uploadPrecentage:0,
            fileURL:'',
            isFilesUploading:false
        }
    }

    async submitForm(value) {
        this.setState({ isFormLoading: true })
        let signupObj = {
            signinEmail: value.signinEmail,
            signinPassword: value.signinPassword,
            mobile: value.mobile,
            nameTitle: value.nameTitle,
            firstName: value.firstName,
            lastName: value.lastName,
            affiliation: value.userType === 1 ? value.affiliation:null,
            userType: value.userType,
            file_url:this.state.fileURL
        }
        let respond = await signUp(signupObj);
        if (respond.success) {
            this.props.history.push({
                pathname: '/email-verify',
                search: `?email=${value.signinEmail}`
            });
            this.setState({ isFormLoading: false });
        } else {
            this.setState({ isFormLoading: false });
        }
    }

    async uploadFiles(file, userType) {
        if (userType === 1){
            this.setState({ isFilesUploading: true });
            let respond = await uploadResearchPaperFile(file[0], this.setState.bind(this));
            this.setState({ fileURL: respond.data.file_path, isFilesUploading: false});
        }
        if (userType === 2){
            this.setState({ isFilesUploading: true });
            let respond = await uploadWorkshopProposalFile(file[0], this.setState.bind(this));
            this.setState({ fileURL: respond.data.file_path, isFilesUploading: false });
        }
    } 


    render() {
        return (
            <div>
                <Header />
                <section id="signup" className={"section-with-bg", styles.signup}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 offset-sm-3">
                                <div className={styles.formmain}>
                                    <div className={styles.title}>
                                        <h4>Hello!, Welcome to eventsy.</h4>
                                        <h3>Sign up</h3>
                                    </div>
                                    <SignupForm submitForm={this.submitForm} isLoading={this.state.isFormLoading} uploadFiles={this.uploadFiles} setURL={this.setState.bind(this)} uploadPrecentage={this.state.uploadPrecentage} isFilesUploading={this.state.isFilesUploading}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Signup);
