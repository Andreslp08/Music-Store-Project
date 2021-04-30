import React from 'react';
import { ProductsBar } from '../products-bar/ProductsBar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link,
    Redirect,
    withRouter,
    useParams

} from "react-router-dom";
import { PAGE_ROUTES } from '../../models/PageRoutes';
import { ProductCard } from '../product-card/ProductCard';
import { ProductsController } from '../../controllers/ProductsController';
import { PRODUCTS_DB } from '../../models/database-simulation/Products'
import { CATEGORIES } from '../../models/Categories';
import ProductsSection from '../products-section/ProductsSection';


class ProductsMain extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const section = this.props.match.params.section;
        return (
            <section className="flex below-navbar relative flex-col sm:flex-row">
                <ProductsBar />
                <section className="flex flex-grow flex-wrap flex-row items-center justify-center">
                    {

                        section.toLowerCase() === "all" ?
                            <ProductsSection sectionName={section} productsData={ProductsController.getAllProducts()} /> :
                            <ProductsSection sectionName={section} productsData={ProductsController.getAllProductsBySection(section)} />
                    }
                    <Route exact path={PAGE_ROUTES.products.productParams} render={(props) => (
                        <h1 className="below-navbar">{props.match.params.id}</h1>)
                    } />

                    {/* <Route exact path={PAGE_ROUTES.products.all} >
                            <ProductsSection sectionName={"All"} productsData={ProductsController.getAllProducts()} />
                        </Route>
                        <Route exact path={PAGE_ROUTES.products.guitars} >
                            <ProductsSection sectionName={"Guitars"} productsData={ProductsController.getAllProductsBySection('guitars')} />
                        </Route>
                        <Route exact path={PAGE_ROUTES.products.basses} >
                            <ProductsSection sectionName={"Basses"} productsData={ProductsController.getAllProductsBySection('basses')} />
                        </Route>
                        <Route exact path={PAGE_ROUTES.products.violins}>
                            <ProductsSection sectionName={"Violins"} productsData={ProductsController.getAllProductsBySection('violins')} />
                        </Route>
                        <Route exact path={PAGE_ROUTES.products.clarinets}>
                            <div className="color-onbackground">Clarinets</div>
                        </Route>
                        <Route exact path={PAGE_ROUTES.products.flutes}>
                            <div className="color-onbackground">Flutes</div>
                        </Route>
                        <Route exact path={PAGE_ROUTES.products.saxophones}>
                            <div className="color-onbackground">Saxophones</div>
                        </Route>
                        <Route exact path={PAGE_ROUTES.products.trumpets}>
                            <div className="color-onbackground">Trumpets</div>
                        </Route> */}
                </section>
            </section>



        )
    }

}

export default withRouter(ProductsMain);