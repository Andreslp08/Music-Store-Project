import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { PAGE_ROUTES } from '../../models/PageRoutes';
import {createAuthWith, PROVIDERS} from '../../controllers/authController'
import { User } from '../../models/User';


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.emailRef = React.createRef();
        this.firstNamesRef = React.createRef();
        this.lastNamesRef = React.createRef();
        this.firstNamesRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
    }

    render() {
        return (
            <div className="flex w-full min-h-offset h-full below-navbar items-center justify-center">
                <div className="grid  grid-cols-1 sm:grid-cols-2 w-full min-h-offset">
                    <section className="bg-primary flex flex-col items-center justify-center sm:h-full ">
                        <h3 className="text-5xl sm:text-8xl color-onprimary font-bebas m-2">Sign Up</h3>
                        {/* <h3 className="m-2 text-center text-xs text-md color-onprimary font-roboto">Buy products and save your shopping and favorites products, you always can follow the state of them.</h3> */}
                        <h3 className="m-2 text-center text-md color-onprimary font-roboto">Do you have an account?</h3>
                        <Link className="variant-button rounded-md" to={PAGE_ROUTES.signIn}>Sign In</Link>
                    </section>
                    <section className="flex flex-col items-center justify-center" >
                        <form className="flex flex-col items-center justify-center" onSubmit={(e)=>{ this.createAccount(); e.preventDefault()}} >
                            <div className="flex flex-wrap items-center justify-center">
                            <input className="textfield primary-textfield" type="email" placeholder="Email" ref={this.emailRef} required></input>
                            <input className="textfield primary-textfield" type="text" placeholder="First names" ref={this.firstNamesRef} required></input>
                            <input className="textfield primary-textfield" type="text" placeholder="Last names" ref={this.lastNamesRef} required></input>
                            <input className="textfield primary-textfield" type="password" placeholder="Password" ref={this.passwordRef} minLength="8" required></input>
                            <input className="textfield primary-textfield" type="password" placeholder="Confirm password" ref={this.confirmPasswordRef} minLength="8" required></input>
                            </div>
                            <input className="primary-button rounded-full cursor-pointer" type="submit" value="Sign Up"  required></input>
                        </form>
                    </section>
                </div>
            </div>
        )
    }


    createAccount(){
        if( this.passwordRef.current.value != this.confirmPasswordRef.current.value){
            alert("Passwords are not the same");
            return;
        }
        const user = new User(
            0,
            this.emailRef.current.value,
            this.firstNamesRef.current.value,
            this.lastNamesRef.current.value,
            this.passwordRef.current.value
        )
        createAuthWith(PROVIDERS.default,user).then(res=>{
            alert("Account created successfuly");
            this.props.history.push(PAGE_ROUTES.signIn)
        }).catch(error=>{
            alert(error);
        })
    }

}

export default withRouter(SignUp);