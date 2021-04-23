
import React from 'react';
import { Home } from '../home/Home';
import { NavLink, Link } from "react-router-dom";
import { PAGE_ROUTES } from '../../models/PageRoutes';
import './ProductsBar.css'
export class ProductsBar extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            category: "Guitars",
            link: PAGE_ROUTES.products.guitars
        }
        this.productListButton = React.createRef();
        this.bar = React.createRef();
    }

    render() {
        return (
            <section ref={this.bar} className="products-main relative flex flex-col items-center bg-gradient-to-r from-purple-500 to-purple-900" data-state="hide">
                <div ref={this.productListButton} className="product-list-button  flex flex-row w-max px-2 p-1 justify-center items-center m-2 cursor-pointer bg-onprimary rounded-full">
                    <p className="color-primary p-1">Products list</p>
                    <i className="arrow-icon fas fa-angle-down color-primary p-1"></i>
                </div>
                <section className="products-list flex flex-col w-full  bg-gradient-to-r from-purple-500 to-purple-900">
                    <section>
                        <p className="color-onprimary m-2 font-bebas text-xl uppercase  border-b-2 border-0 border-white border-solid">Strings</p>
                        <ul className="w-full flex flex-col items-center">
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer"><NavLink to={PAGE_ROUTES.products.guitars} activeClassName="product-link-activated" className="w-full block">Guitars</NavLink></li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer"><NavLink to={PAGE_ROUTES.products.basses} activeClassName="product-link-activated" className="w-full block">Basses</NavLink></li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl cursor-pointer"><NavLink to={PAGE_ROUTES.products.violins} activeClassName="product-link-activated" className="w-full block">Violins</NavLink></li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer"><NavLink to={PAGE_ROUTES.products.pianos} activeClassName="product-link-activated" className="w-full block">Pianos</NavLink></li>
                        </ul>
                    </section>
                    <section>
                        <p className="color-onprimary m-2 font-bebas text-xl uppercase  border-b-2 border-0 border-white border-solid">Percussion</p>
                        <ul className="w-full flex flex-col items-center">
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer">Drum-Kits</li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer">Congos</li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl cursor-pointer">Xylophones</li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer">Tambourines</li>
                        </ul>
                    </section>
                    <section>
                        <p className="color-onprimary m-2 font-bebas text-xl uppercase  border-b-2 border-0 border-white border-solid">Wind</p>
                        <ul className="w-full flex flex-col items-center">
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer">Saxophones</li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer">trumpets</li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl cursor-pointer">Flutes</li>
                            <li className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer">Clarinets</li>
                        </ul>
                    </section>
                </section>
            </section>
        )
    }




    componentDidMount() {
        this.productsLinksManager();
        this.barVisibilityManager();
    }

    barVisibilityManager() {
        this.productListButton.current.addEventListener('click', (e) => {
            let state = this.bar.current.dataset.state;
            if (state == "show") {
                this.showProductsList(false)
            }
            if (state == "hide") {
                this.showProductsList(true)
            }
        })
    }


    showProductsList(tof) {
        if (tof == true) {
            this.bar.current.dataset.state = "show";
            // document.body.style.overflow = "hidden";
            // window.onresize = () => {
            //     if (!window.matchMedia('(max-width:600px)').matches) {
            //         document.body.style.overflow = "auto";
            //     }
            //     else {
            //         if (tof == true) {
            //             document.body.style.overflow = "hidden";
            //         }
            //         else {
            //             document.body.style.overflow = "auto";

            //         }
            //     }
            // };

        }
        else {
            this.bar.current.dataset.state = "hide";
            // document.body.style.overflow = "auto";
        }


    }

    productsLinksManager() {
        let productsLinks = document.getElementsByClassName("product-link");
        for (let i = 0; i < productsLinks.length; i++) {
            let link = productsLinks.item(i);
            link.addEventListener('click', (e) => {
                this.clearLinksActivated();
                this.showProductsList(false);
            });
        }
    }

    clearLinksActivated() {
        let productsLinks = document.getElementsByClassName("product-link");
        for (let i = 0; i < productsLinks.length; i++) {
            let link = productsLinks.item(i);
            link.classList.remove('product-link-activated');
        }
    }

}