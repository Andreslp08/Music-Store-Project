import { data } from 'autoprefixer';
import React, { createRef } from 'react';
import { withRouter } from 'react-router';
import { ProductsController } from '../../controllers/ProductsController';
import './ProductView.css';
// import ReactImageZoom from 'react-image-zoom';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import store from '../../redux/store/Store';
import { addProductToCart, addProductToFavorite, removeProductFromCart, updateCartProductQuantity } from '../../redux/actions/ProductActions';

class ProductView extends React.Component {
    constructor(props) {
        super(props);
        this.favoriteButtonRef = React.createRef();
        this.cartButtonRef = React.createRef();
        this.state = {
            data: {
                id: 1,
                section: "guitars",
                name: "Product name",
                imgPath: this.imgRef,
                price: 0,
                details: "Details",
                isNew: true,
                isPromo: true,
                promo: "50% off",
                isSoldOut: true
            },
            exists: false,
            errorMsg: "",
            zoomImage: false,
            favoriteStates: { added: "added to", toAdd: "add to" },
            favoriteButtonText: "add to",
            cartStates: { added: "Added to", toAdd: "add to" },
            cartButtonText: "add to",
            quantity:1
        }
        this.onClickImage = this.onClickImage.bind(this);
        this.quantityInputChangeHandler = this.quantityInputChangeHandler.bind(this);

    }

    onClickImage() {
        if (this.state.zoomImage == false) {
            this.setState({
                zoomImage: !this.state.zoomImage
            });
        }

        console.log(this.state.zoomImage)
    }

    render() {
        let images = [
            {
                url: this.state.data.imgPath,
                title: "image title 1"
            },
            {
                url: "https://images.unsplash.com/photo-1617165162694-9703691c370b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "image title 2"
            }
        ]
        const name = this.state.data.name;
        const price = `$${new Intl.NumberFormat().format(this.state.data.price)}`;
        return (
            <section className="below-navbar min-h-offset">
                {this.state.exists == false ?
                    <h1>{this.state.errorMsg}</h1>
                    :
                    <div className="grid sm:grid-cols-2 grid-cols-1">
                        <figure className="relative flex items-center h-60 sm:min-h-screen sm:sticky sm:top-0 sm:bottom-0 sm:left-0 bg-black flex justify-center overflow-hidden">
                            <img ref={this.image} className="absolute top-0 left-0 w-full h-full filter blur-md border-none outline-none" src={this.state.data.imgPath} onClick={this.onClickImage}></img>
                            <img ref={this.image} className="product-view-img rounded-xl z-50" src={this.state.data.imgPath} onClick={this.onClickImage}></img>
                        </figure>
                        <section className="flex flex-col min-h-offset items-center">
                            <h2 className="color-onbackground text-xl sm:text-2xl text-center font-anton m-2">{name}</h2>
                            <p className="font-roboto color-onbackground text-3xl sm:text-5xl text-center font-anton m-2">{price}</p>
                            {this.QuantityInput()}
                            {this.state.data.isSoldOut == false ?
                                <div className="flex items-center justify-center flex-wrap">
                                    <button className="primary-button">Buy now</button>
                                    <button className="variant-button rounded-full" ref={this.cartButtonRef}>{this.state.cartButtonText} <i className="fas fa-shopping-cart"></i></button>
                                    <button className="variant-button rounded-full" ref={this.favoriteButtonRef}>{this.state.favoriteButtonText} <i className="fas fa-star" ></i></button>
                                </div>
                                :
                                this.SouldOutTag()
                            }
                            <div className="flex items-center justify-center flex-wrap">
                                {this.PromoTag()}
                                {this.NewTag()}
                            </div>
                            <div className="flex flex-col p-2 w-full items-center">
                                <h3 className="font-bebas text-left color-onbackground border-solid border-t-0 border-l-0 border-r-0 p-2 w-min m-2">Description</h3>
                                <p className="font-dosis  font-light color-onbackground m-2">{this.state.data.details}</p>
                            </div>

                        </section>
                    </div>
                }
                {this.state.zoomImage ?
                    <Lightbox images={images} onClose={() => { this.setState({ zoomImage: false }) }} />
                    : null}
            </section>
        );
    }


    QuantityInput() {
        const { quantity} = this.state;
        return <input type="number" className="p-2 m-2 text-center rounded-full w-20 border-solid border-black border-2"  value={quantity} onChange={this.quantityInputChangeHandler} min="1" max="1000" step="1" placeholder="Quantity" />
    }

    PromoTag() {
        return <div>
            {this.state.data.isPromo ?
                <p className="color-onbackground text-xl m-2 border-solid p-2 font-anton">{this.state.data.promo}</p>
                : null
            }
        </div>
    }

    SouldOutTag() {
        return <div>
            {this.state.data.isSoldOut ?
                <p className="color-error text-xl m-2 border-solid p-2 font-anton">Sold Out</p>
                : null
            }
        </div>
    }

    NewTag() {
        return <div>
            {this.state.data.isNew ?
                <p className="color-successful text-xl m-2 border-solid p-2 font-anton">New</p>
                : null
            }
        </div>
    }
    componentDidMount() {
        setTimeout(() => {
            this.favoriteHandler();
            this.cartHandler();
        }, 250);
        this.loadProductData();
    }

    favoriteHandler() {
        const favoriteButton = this.favoriteButtonRef.current;
        if( favoriteButton == null){
            return;
        }
        const activeClass = 'favorite-button-active'
        favoriteButton.addEventListener('click', (e) => {
            const icon = favoriteButton.children.item(0);
            icon.classList.toggle(activeClass);
            if (icon.classList.contains(activeClass)) {
                this.setState({
                    favoriteButtonText: this.state.favoriteStates.added
                })
            } else {
                this.setState({
                    favoriteButtonText: this.state.favoriteStates.toAdd
                })
            }
        })
    }

    cartHandler() {
        const cartButton = this.cartButtonRef.current;
        if( cartButton == null){
            return;
        }
        const {id} = this.state.data;
        let cartData = store.getState().cart.find((product, index, array)=> product.id == id?product:false)
        const activeClass = 'cart-button-active'
        const icon = cartButton.children.item(0);
        // check if this product is added to cart and load cart data
        if( cartData){
            icon.classList.toggle(activeClass);
            this.setState({
                quantity:cartData.quantity,
                cartButtonText: this.state.cartStates.added
            })
        }
        // add to cart or remove from cart
        cartButton.addEventListener('click', (e) => {
            icon.classList.toggle(activeClass);
            if (icon.classList.contains(activeClass)) {
                this.setState({
                    cartButtonText: this.state.cartStates.added
                })
                store.dispatch(addProductToCart({
                    id:this.state.data.id,
                    quantity: parseInt(this.state.quantity) 
                  }))
            } else {
                this.setState({
                    cartButtonText: this.state.cartStates.toAdd
                })
                store.dispatch(removeProductFromCart(this.state.data.id));
            }
        })
    }

    quantityInputChangeHandler(event){
        this.setState({
            quantity:event.currentTarget.value
        })
        const isAddedToCart = this.state.cartButtonText == this.state.cartStates.added?true:false;
        if( isAddedToCart){
            store.dispatch(updateCartProductQuantity({
                id:this.state.data.id,
                quantity: parseInt(event.currentTarget.value) 
              }))
        }
    }

    loadProductData() {
        const productId = this.props.match.params.id;
        ProductsController.getProductById(productId).then((res) => {
            this.setState({
                exists: true,
                data: res
            })
        }).catch(error => {
            this.setState({
                exists: false,
                errorMsg: error
            })
        });
    }
}
export default withRouter(ProductView);