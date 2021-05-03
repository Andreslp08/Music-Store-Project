import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { PAGE_ROUTES } from '../../models/PageRoutes';
import { Swicth } from '../switch/Switch';


class SignUp extends React.Component{
    constructor(props){
        super(props);
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
                    <section className="flex flex-col items-center justify-center">
                        <form className="flex flex-col items-center justify-center">
                            <div className="flex flex-wrap items-center justify-center">
                            <input className="textfield primary-textfield" type="email" placeholder="Email" required></input>
                            <input className="textfield primary-textfield" type="email" placeholder="First names" required></input>
                            <input className="textfield primary-textfield" type="email" placeholder="Last names" required></input>
                            <input className="textfield primary-textfield" type="password" placeholder="Password" required></input>
                            <input className="textfield primary-textfield" type="password" placeholder="Confirm password" required></input>
                            </div>
                            <input className="primary-button rounded-full cursor-pointer" type="submit" value="Sign Up" required></input>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp);