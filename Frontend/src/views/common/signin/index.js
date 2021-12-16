import React, { Component } from 'react';
import { signin } from '../../../services/util/auth';
import Footer from '../commonViews/footer';
import Header from '../commonViews/header';
import styles from './signin.module.scss';
import SigninForm from './signinForm';

export class Signin extends Component {
    constructor(props) {
        super(props)
    
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            isFormLoading:false
        }
    }

    async submitForm(value){
        this.setState({ isFormLoading: true });
        let respond = await signin(value.signinEmail, value.signinPassword);
        if (respond.success) {
            this.setState({ isFormLoading: false });
            this.props.history.push("/app");
        } else {
            this.setState({ isFormLoading: false });
        }
        
    }
    
    render() {
        return (
            <div>
                <Header />
                <section id="signin" className={"section-with-bg", styles.signin}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 offset-sm-3">
                                <div className={styles.formmain}>
                                    <div className={styles.title}>
                                        <h4>Hello!, Welcome back.</h4>
                                        <h3>Sign in</h3>
                                    </div>
                                    <SigninForm submitForm={this.submitForm} isLoading={this.state.isFormLoading}/>
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

export default Signin;
