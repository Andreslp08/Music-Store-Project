
import React from 'react';
import { Home } from '../home/Home';
import { NavLink, Link } from "react-router-dom";
import { PAGE_ROUTES } from '../../models/PageRoutes';
import './ProductsBar.css'
import { CATEGORIES } from '../../models/Categories';
export class ProductsBar extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            sections: undefined
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
                    {this.loadCategories()}
                </section>
            </section>
        )
    }




    componentDidMount() {
        this.productsLinksManager();
        this.barVisibilityManager();
    }

    loadCategories() {
        return CATEGORIES.map((category, index) => {
            return (
                <section key={`category_${index}`}>
                    <p className="color-onprimary m-2 font-bebas text-xl uppercase  border-b-2 border-0 border-white border-solid">{category.name}</p>
                    <ul className="w-full flex flex-col items-center">
                      {this.loadSubCategories(category.name)}
                    </ul>
                </section>
            )
        })
    }

    loadSubCategories(categoryName) {
        let categorySection = CATEGORIES.find(category => category.name == categoryName);
        return categorySection.subcategories.map((subcategory,index) => {
            return (
                <li key={`subcategory_${index}`} className="product-link list-none w-full p-x-2 text-center text-white font-dosis text-xl  cursor-pointer"><NavLink to={`${subcategory.link}`} activeClassName="product-link-activated" className="w-full block">{subcategory.name}</NavLink></li>
            )
        })
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
            document.body.style.overflow = "hidden";
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
            document.body.style.overflow = "auto";
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