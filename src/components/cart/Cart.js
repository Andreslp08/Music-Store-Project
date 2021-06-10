
import React from 'react';
import { withRouter } from 'react-router-dom';
import { ProductsController } from '../../controllers/ProductsController';
import { removeProductFromCart } from '../../redux/actions/ProductActions';
import store from '../../redux/store/Store';
import ProductAdded from '../product-added/ProductAdded';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.updatedProducts(),
            total: 0,
            totalProducts: 0
        }
    }

    componentDidMount() {
        this.updateBuy();
        this.cartSubscription = store.subscribe(() => {
            this.setState({
                products: this.updatedProducts()
            });
            this.updateBuy();
        });
    }

    componentWillUnmount() {
        this.cartSubscription();
    }

    render() {

        let { total, totalProducts } = this.state;
         total = `$${new Intl.NumberFormat().format(total)}`;
        return (
            <div className="below-navbar min-h-offset color-onbackground flex flex-col items-center justify-between">
                <h2 className="font-bebas color-onbackground text-6xl p-2">Cart</h2>
                <section>
                    {this.state.products.length> 0?
                    this.state.products:
                    <div className="flex items-center flex-col">
                    <i class="fas fa-shopping-cart fa-4x color-onbackground"></i>
                    <p className="color-onbackground font-roboto m-2">Your cart is empty</p>
                    </div>
                    }
                </section>
                <section className="flex w-full  sticky left-0 bottom-0 items-center justify-center flex-wrap bg-gradient-to-r from-purple-500 to-purple-900 p-2">
                    <div>
                        <h2 className="color-onprimary text-4xl  font-roboto text-center">Total Price: {total}</h2>
                        <h3 className="color-onprimary font-roboto text-center font-sans">Total products: {totalProducts}</h3>
                    </div>
                    <button className="variant-button text-2xl font-anton rounded-lg">Buy</button>
                </section>
            </div>
        )
    }

    updatedProducts() {
        return store.getState().cart.map((value, index, array) => {
            return <ProductAdded key={`cartProduct_${value.id}`} productId={value.id} quantity={value.quantity} visibility={{ cartButton: false }} deleteAction={() => { this.deleteProduct(value.id) }} />
        })
    }

    deleteProduct(id) {
        store.dispatch(removeProductFromCart(id))
    }

    async updateBuy() {
        this.setState({
            total: 0,
            totalProducts: 0
        })
        await store.getState().cart.map((value, index, array) => {
            ProductsController.getProductById(value.id).then((res) => {
                this.setState({
                    total: this.state.total + (res.price * value.quantity),
                    totalProducts: this.state.totalProducts + value.quantity
                })

            }).catch((err) => {
                console.log(err)
            })
        })
    }
}


export default withRouter(Cart);
