import { signInWithCredential } from '@firebase/auth';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { defaultSignIn, googleSignIn } from '../../controllers/authController';
import { PAGE_ROUTES } from '../../models/PageRoutes';
import { Swicth } from '../switch/Switch';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.rememberSwitchRef = React.createRef();
        this.state = {
            remember: false
        }
    }

    componentDidMount() {
        this.loadCredentials();
    }

    render() {
        return (
            <div className="flex w-full min-h-offset h-full below-navbar items-center justify-center">
                <div className="grid  grid-cols-1 sm:grid-cols-2 w-full min-h-offset">
                    <section className="bg-primary flex flex-col items-center justify-center sm:h-full ">
                        <h3 className="text-5xl sm:text-8xl color-onprimary font-bebas m-2">Sign In</h3>
                        {/* <h3 className="m-2 text-center text-xs text-md color-onprimary font-roboto">Buy products and save your shopping and favorites products, you always can follow the state of them.</h3> */}
                        <h3 className="m-2 text-center text-md color-onprimary font-roboto">You don't have an account ?</h3>
                        <Link className="variant-button rounded-md" to={PAGE_ROUTES.signUp}>Sign Up</Link>
                    </section>
                    <section className="flex flex-col items-center justify-center">
                        <form className="flex flex-col items-center justify-center" onSubmit={(e) => { this.sigIn(); e.preventDefault() }}>
                            <input className="textfield primary-textfield" type="email" placeholder="Email" ref={this.emailRef} required></input>
                            <input className="textfield primary-textfield" type="password" placeholder="Password" ref={this.passwordRef} required></input>
                            <div className="flex flex-wrap items-center">
                                <h3 className="color-onbackground m-2 font-roboto">Remember me</h3>
                                <Swicth ref={this.rememberSwitchRef} />
                            </div>
                            <Link className="m-2 text-center text-xs color-onbackground font-roboto" to="/recover-password">Forgot password ? Click here</Link>
                            <input className="primary-button rounded-full cursor-pointer" type="submit" value="Sign In" required></input>
                        </form>
                        <h3 className="color-onbackground m-2 font-anton font-roboto font-bold">Or Sign in with</h3>
                        <button className="secondary-button rounded-full p-2" onClick={() => { this.signInWithGoogle() }}>Google</button>
                    </section>
                </div>
            </div>
        )
    }

    sigIn() {
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;
        defaultSignIn(email, password).then((userCredential) => {
            alert("Welcome " + userCredential.user.email);
            if (this.rememberSwitchRef.current.isActivated()) {
                this.saveCredentials(email, password)
            } else {
                localStorage.removeItem('user-credentials');
            }
            this.props.history.push(PAGE_ROUTES.home)
        }).catch(error => {
            alert(error);
        })
    }

    signInWithGoogle() {
        googleSignIn().then(result => {
            this.props.history.push(PAGE_ROUTES.home)
        });
    }

    saveCredentials(email, password) {
        localStorage.setItem("user-credentials", JSON.stringify({
            email: email,
            password: password
        }))
        console.log("Credentials was saved");
    }

    loadCredentials() {
        const credentials = JSON.parse(localStorage.getItem('user-credentials'));
        if (credentials) {
            this.emailRef.current.value = credentials.email;
            this.passwordRef.current.value = credentials.password;
            this.rememberSwitchRef.current.setActive(true);
        }
    }
}

export default withRouter(SignIn);