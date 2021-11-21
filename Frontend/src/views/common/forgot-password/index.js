import React, { Component } from 'react';
import styles from './forgotPassword.module.scss';
import EmailVerifyForm from './emailVerifyForm';
import PasswordResetForm from './passwordResetForm';
import Header from '../commonViews/header';
import Footer from '../commonViews/footer';
import { forgotPasswordEmailVerify, resetPassword} from '../../../services/util/auth';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.submitPasswordResetForm = this.submitPasswordResetForm.bind(this);
        this.state = {
            is_submission_loading:false,
            view_page: 0,
            email_address:''
        }
    }

    async submitForm(value) {
        this.setState({ is_submission_loading:true });
        let respond = await forgotPasswordEmailVerify(value.forgotPassEmail);
        if (respond.success === true){
            this.setState({ view_page: 1, email_address: value.forgotPassEmail, is_submission_loading:false });
        }else{
            this.setState({ is_submission_loading: false });
        }
        
    }

    async submitPasswordResetForm(value) {
        this.setState({ is_submission_loading: true });
        let respond = await resetPassword(value.verificationCode,this.state.email_address, value.password);
        if (respond.success === true) {
            this.setState({ is_submission_loading: false });
            this.props.history.push('/signin');
        } else {
            this.setState({ is_submission_loading: false });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <section id="email-verify" className={"section-with-bg", styles.emailVerify}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 offset-sm-3">
                                <div className={styles.formmain}>
                                    <div className={styles.title}>
                                        <h4>Welcome!</h4>
                                        <h3>Forgot Password</h3>
                                        {this.state.view_page === 1 &&
                                            <p className={styles.verificationcodeText}>We have sent you a 6 digit verification code to <b>{''}</b>. Please enter that verification code and new password below</p>
                                        }

                                    </div>
                                    {this.state.view_page === 0 &&
                                        <EmailVerifyForm submitForm={this.submitForm} isLoading={this.state.is_submission_loading}/>
                                    }
                                    {this.state.view_page === 1 &&
                                        <PasswordResetForm submitForm={this.submitPasswordResetForm} isLoading={this.state.is_submission_loading}/>
                                    }
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

export default ForgotPassword;
