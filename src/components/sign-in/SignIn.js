import { signInWithCredential } from '@firebase/auth';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { defaultSignIn } from '../../controllers/authController';
import { PAGE_ROUTES } from '../../models/PageRoutes';
import { Swicth } from '../switch/Switch';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
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
                        <form className="flex flex-col items-center justify-center" onSubmit={(e)=>{this.sigIn();e.preventDefault()}}>
                            <input className="textfield primary-textfield" type="email" placeholder="Email" ref={this.emailRef} required></input>
                            <input className="textfield primary-textfield" type="password" placeholder="Password" ref = {this.passwordRef} required></input>
                            <div className="flex flex-wrap items-center">
                                <h3 className="color-onbackground m-2 font-roboto">Remember me</h3>
                                <Swicth />
                            </div>
                            <Link className="m-2 text-center text-xs color-onbackground font-roboto" to="/recover-password">Forgot password ? Click here</Link>
                            <input className="primary-button rounded-full cursor-pointer" type="submit" value="Sign In" required></input>
                        </form>
                        <h3 className="color-onbackground m-2 font-anton font-roboto font-bold">Or Sign in with</h3>
                        <button className="secondary-button rounded-full p-2">Google</button>
                    </section>
                </div>
            </div>
        )
    }
    sigIn(){
        defaultSignIn(
            this.emailRef.current.value,
            this.passwordRef.current.value
        ).then((userCredential)=>{
            alert("Welcome " + userCredential.user.email);
        }).catch(error=>{
            alert(error);
        })
    }
}

export default withRouter(SignIn);