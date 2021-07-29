
import React from 'react';
import { withRouter} from 'react-router-dom';
import { ProductsController } from '../../controllers/ProductsController';
import { removeProductFromFavorites } from '../../redux/actions/ProductActions';
import store from '../../redux/store/Store';
import ProductAdded from '../product-added/ProductAdded';

class Favorites extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: this.updatedProducts(),
        }
    }

    componentDidMount() {
        this.cartSubscription = store.subscribe(() => {
            this.setState({
                products: this.updatedProducts()
            });
        });
    }

    componentWillUnmount() {
        this.cartSubscription();
    }

    render() {
        return (
            <div className="below-navbar min-h-offset color-onbackground flex flex-col items-center justify-center">
                <h2 className="font-bebas color-onbackground text-6xl p-2">Favorites</h2>
                <section>
                    {this.state.products.length> 0?
                    this.state.products:
                    <div className="flex items-center flex-col">
                    <i className="fas fa-star fa-4x color-onbackground"></i>
                    <p className="color-onbackground font-roboto m-2">Your favorites list is empty</p>
                    </div>
                    }
                </section>
            </div>
        )
    }

    updatedProducts() {
        return store.getState().favorites.map((value, index, array) => {
            return <ProductAdded key={`favoriteProduct_${value.id}`} productId={value.id} quantity={1} visibility={{ favoriteButton: false }} deleteAction={() => { this.deleteProduct(value.id) }} />
        })
    }

    deleteProduct(id) {
        store.dispatch(removeProductFromFavorites(id))
    }

}

export default withRouter(Favorites);
