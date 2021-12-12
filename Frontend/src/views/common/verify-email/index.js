import React, { Component } from 'react';
import styles from './verify-email.module.scss';
import EmailVerifyForm from './verifyEmailForm';
import { verifyEmail, resendToken} from '../../../services/util/auth'

export class VerifyEmail extends Component {
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.state = {
            isFormLoading: false,
            isResendLoading:false,
            user_email: ''
        }
    }
    async submitForm(value) {
        this.setState({ isFormLoading: true });
        let respond = await verifyEmail(this.state.user_email,value.code);
        if (respond.success === true){
            this.setState({ isFormLoading: false });
            this.props.history.push('/signin');
        }else{
            this.setState({ isFormLoading: false });
        }
    }

    async resendCode() {
        this.setState({ isResendLoading:true});
        let respond = await resendToken(this.state.user_email);
        if(respond.success === true){
            this.setState({ isResendLoading: false });
        }else{
            this.setState({ isResendLoading: false });
        }
    }

    componentDidMount(){
        if (!(this.props.history.location.search)){
            this.props.history.push("/");
        }else{
            let email = new URLSearchParams(this.props.location.search).get("email");
            this.setState({ user_email: email})
        }
    }

    render() {
        return (
            <div>
                <section id="verifyemail" className={"section-with-bg", styles.verifyEmail}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 offset-sm-3">
                                <div className={styles.formmain}>
                                    <div className={styles.title}>
                                        <h4>Verify your email</h4>
                                        <h3>Email Verification</h3>
                                        <p className={styles.verificationcodeText}>We have sent you a 6 digit verification code to <b>{this.state.user_email}</b>.</p>
                                        <p className={styles.verificationcodeText}>didn't received? <span className={styles.resendText} onClick={this.state.isResendLoading ? null : this.resendCode}>Resend&nbsp;&nbsp;{this.state.isResendLoading ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>:null}</span></p>
                                        <EmailVerifyForm submitForm={this.submitForm} isLoading={this.state.isFormLoading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default VerifyEmail
