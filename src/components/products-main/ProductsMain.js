import React from 'react';
import { ProductsBar } from '../products-bar/ProductsBar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { PAGE_ROUTES } from '../../models/PageRoutes';
import { ProductCard } from '../product-card/ProductCard';

export class ProductsMain extends React.Component {


    constructor(props){
        super(props)

    }
    render() {
        return (
            <Router>
                <section className="flex below-navbar relative flex-col sm:flex-row">
                    <ProductsBar />
                    <section className="flex flex-grow flex-wrap flex-row items-center justify-center">
                        <Route path={PAGE_ROUTES.products.guitars}>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        </Route>
                        <Route path={PAGE_ROUTES.products.basses}>
                            <div className="color-onbackground">Basses</div>
                        </Route>
                        <Route path={PAGE_ROUTES.products.violins}>
                            <div className="color-onbackground">Violins</div>
                        </Route>
                        <Route path={PAGE_ROUTES.products.clarinets}>
                            <div className="color-onbackground">Clarinets</div>
                        </Route>
                        <Route path={PAGE_ROUTES.products.flutes}>
                            <div className="color-onbackground">Flutes</div>
                        </Route>
                        <Route path={PAGE_ROUTES.products.saxophones}>
                            <div className="color-onbackground">Saxophones</div>
                        </Route>
                        <Route path={PAGE_ROUTES.products.trumpets}>
                            <div className="color-onbackground">Trumpets</div>
                        </Route>
                    </section>

                </section>
            </Router>

        )
    }
}