import React from 'react'
import { Swicth } from '../switch/Switch'
import './Navbar.css'
import { Link, NavLink, withRouter } from "react-router-dom";
import { PAGE_ROUTES } from '../../models/PageRoutes';
import store from '../../redux/store/Store';

 class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.switchRef = React.createRef();
        this.themes = { dark: "dark", light: "light" };
        this.hamburgerMenu = React.createRef();
    }



    render() {
        return (
            <header className="header">
                <nav className="navbar flex items-center justify-between">
                    <div ref={this.hamburgerMenu} className="hamburger-menu" data-state="hide">
                        <label className="hamburger-line"></label>
                    </div>
                    <h1 className="m-2 font-anton text-md sm:text-xl color-onbackground cursor-pointer text-center" ><NavLink to={PAGE_ROUTES.home}  onClick={()=>{ this.showMenu(false)}}>Music store</NavLink></h1>
                    <div className="flex justify-center items-center m-1">
                                <i className="fas fa-moon fa-1x p-1 color-onbackground "></i>
                                <Swicth ref={this.switchRef} />
                            </div>
                    <div className="navbar-main flex items-center sm:justify-between">
                        <ul className="list flex justify-center items-center">
                            <li className="item"><NavLink to={PAGE_ROUTES.home} activeStyle={{ color: 'var(--primaryColor' }} onClick={()=>{ this.showMenu(false)}}>Home</NavLink></li>
                            <li className="item"><NavLink to={PAGE_ROUTES.products.all} activeStyle={{ color: 'var(--primaryColor' }}  onClick={()=>{ this.showMenu(false)}}>Products</NavLink></li>
                            <li className="item"><NavLink to="/t" activeStyle={{ color: 'var(--primaryColor' }}  onClick={()=>{ this.showMenu(false)}}>Contact</NavLink></li>
                        </ul>
                        <div className="navbar-user-section flex justify-center items-center flex-row mx-4 flex-wrap">
                            <div className="flex flex-nowrap justify-center items-center">
                                <Link className="rounded-full  m-2 color-onbackground hover-scale" to={PAGE_ROUTES.cart} onClick={()=>{ this.showMenu(false)}}>
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                                <Link className="rounded-full  m-2 color-onbackground hover-scale" to ={PAGE_ROUTES.favorites} onClick={()=>{ this.showMenu(false)}}>
                                    <i className="fas fa-star favorite-button"></i>
                                </Link>
                                {store.getState().user.isAuth?
                                <div className="flex flex-row flex-wrap items-center justify-center text-center">
                                    <img src={store.getState().user.avatarPath}  className="rounded-full w-9 h-9 hover-scale m-1 mx-1 border-none"  onClick={()=>{ this.showMenu(false)}}></img>
                                </div>
                                 :
                                 <Link className="primary-button rounded-full py-1" to={PAGE_ROUTES.signIn} onClick={()=>{ this.showMenu(false)}}>Sign In</Link>

                                }
                               
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    componentDidMount() {
        this.loadTheme();
        this.themeManager();
        this.hamburgerMenuManager();
    }

    hamburgerMenuManager() {
        let hamburgerMenu = this.hamburgerMenu.current;
        hamburgerMenu.addEventListener('click', () => {
            let state = hamburgerMenu.dataset.state;
            if (state == "show") {
                this.showMenu(false);
            }
            else if (state == "hide") {
                this.showMenu(true);
            }
        })

        // })
    }

    themeManager() {
        this.switchRef.current.component.addEventListener('switchClick', (e) => {
            if (e.detail.activated == true) {
                document.body.dataset.theme = this.themes.dark;
                localStorage.setItem("theme", this.themes.dark);
            }
            else {
                document.body.dataset.theme = this.themes.light;
                localStorage.setItem("theme", this.themes.light);
            }
        })

    }


    showMenu(tof) {
        if (tof == true) {
            // window.onresize = ()=>{
            //     if( !window.matchMedia('(max-width:800px)').matches){
            //         document.body.style.overflow = "auto";
            //     }
            // };
            this.hamburgerMenu.current.dataset.state = "show";
            document.body.style.overflow = "hidden";
        }
        else {
            this.hamburgerMenu.current.dataset.state = "hide";
            document.body.style.overflow = "auto";

        }
    }
    loadTheme() {
        let theme = localStorage.getItem("theme");
        if (theme != null) {
            document.body.dataset.theme = theme;
            switch (theme) {
                case this.themes.dark:
                    this.switchRef.current.setActive(true);
                    break;
                case this.themes.light:
                    this.switchRef.current.setActive(false);
                    break;
                default:
                    this.switchRef.current.setActive(false);
                    break;
            }
        }
    }


}

export default withRouter(Navbar);