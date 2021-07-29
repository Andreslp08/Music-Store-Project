import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PAGE_ROUTES } from '../../models/PageRoutes';
class NotFound extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="flex flex-col w-full items-center justify-center">
                <h1 className="color-onbackground text-3xl font-roboto m-2 text-center">OOPS!</h1>
                <h3 className="font-anton color-primary border-solid border-4  p-2 text-9xl animate-pulse">404</h3>
                <h1 className="color-onbackground text-3xl font-roboto m-2 text-center">Page not found</h1>
                <section className="flex flex-wrap items-center justify-center">
                    <Link className="primary-button" to={PAGE_ROUTES.home}>Return to safe page!</Link>
                    <Link className="variant-button rounded-full" to={PAGE_ROUTES.home}>Report</Link>
                </section>
             
            </section>
        )
    }
}
export default withRouter(NotFound);
