import { data } from 'autoprefixer';
import React, { createRef } from 'react';
import { withRouter } from 'react-router';
import { ProductsController } from '../../controllers/ProductsController';
import './ProductView.css';
// import ReactImageZoom from 'react-image-zoom';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import store from '../../redux/store/Store';
import { addProductToCart, addProductToFavorite, removeProductFromCart, removeProductFromFavorites, updateCartProductQuantity } from '../../redux/actions/ProductActions';
import TwoStateButton from '../two-state-button/TwoStateButton';

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
                mainImgPath: this.imgRef,
                imagesPath:[],
                price: 0,
                details: "Details",
                isNew: true,
                isPromo: true,
                promo: "50% off",
                isSoldOut: true
            },
            addedToCart: false,
            addedToFavorites: false,
            exists: false,
            errorMsg: "",
            zoomImage: false,
            quantity: 1
        }
        this.onClickImage = this.onClickImage.bind(this);
        this.quantityInputChangeHandler = this.quantityInputChangeHandler.bind(this);
        this.onCartButtonClick = this.onCartButtonClick.bind(this);
        this.onFavoriteButtonClick = this.onFavoriteButtonClick.bind(this);
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
        const name = this.state.data.name;
        const price = `$${new Intl.NumberFormat().format(this.state.data.price)}`;
        return (
            <section className="below-navbar min-h-offset">
                {this.state.exists == false ?
                    <h1>{this.state.errorMsg}</h1>
                    :
                    <div className="grid sm:grid-cols-2 grid-cols-1">
                        <figure className="relative flex items-center h-60 sm:min-h-screen sm:sticky sm:top-0 sm:bottom-0 sm:left-0 bg-black flex justify-center overflow-hidden">
                            <img ref={this.image} className="absolute top-0 left-0 w-full h-full filter blur-md border-none outline-none" src={this.state.data.mainImgPath} onClick={this.onClickImage}></img>
                            <img ref={this.image} className="product-view-img rounded-xl z-50" src={this.state.data.mainImgPath} onClick={this.onClickImage}></img>
                        </figure>
                        <section className="flex flex-col min-h-offset items-center">
                            <h2 className="color-onbackground text-xl sm:text-2xl text-center font-anton m-2">{name}</h2>
                            <p className="font-roboto color-onbackground text-3xl sm:text-5xl text-center font-anton m-2">{price}</p>
                            {this.QuantityInput()}
                            {this.state.data.isSoldOut == false ?
                                <div className="flex items-center justify-center flex-wrap">
                                    <button className="primary-button">Buy now</button>
                                    <TwoStateButton iconClass={"fas fa-shopping-cart"} showIcon={true} active={this.state.addedToCart} defaultText={"Add to"} activeText={"Added to"} onClick={this.onCartButtonClick} />
                                    <TwoStateButton iconClass={"fas fa-star"} showIcon={true} active={this.state.addedToFavorites} defaultText={"Add to"} activeText={"Added to"} onClick={this.onFavoriteButtonClick} />
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
                    <Lightbox images={this.state.data.imagesPath} onClose={() => { this.setState({ zoomImage: false }) }} />
                    : null}
            </section>
        );
    }


    QuantityInput() {
        const { quantity } = this.state;
        return <input type="number" className="p-2 m-2 text-center rounded-full w-20 border-solid border-black border-2" value={quantity} onChange={this.quantityInputChangeHandler} min="1" max="1000" step="1" placeholder="Quantity" />
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
        this.loadProductData();
        this.initialCartButtonState();
        this.initialFavoriteButtonState();
    }


    initialCartButtonState() {
        const id = this.props.match.params.id;
        let isProductAdded = store.getState().cart.find((product, index, array) => product.id == id )
        this.setState({
            addedToCart: isProductAdded
        })
    }

    onCartButtonClick(isActivated) {
        if (isActivated) {
            store.dispatch(addProductToCart({
                id: this.state.data.id,
                quantity: parseInt(this.state.quantity)
            }))
        }
        else {
            store.dispatch(removeProductFromCart(this.state.data.id));
        }
    }

    initialFavoriteButtonState() {
        const id = this.props.match.params.id;
        let isProductAdded = store.getState().favorites.find((product, index, array) => product.id == id ? true : false)
        this.setState({
            addedToFavorites: isProductAdded
        })
    }

    onFavoriteButtonClick(isActivated) {
        if (isActivated) {
            store.dispatch(addProductToFavorite({
                id: this.state.data.id,
                quantity: parseInt(this.state.quantity)
            }))
        }
        else {
            store.dispatch(removeProductFromFavorites(this.state.data.id));
        }
    }


    quantityInputChangeHandler(event) {
        this.setState({
            quantity: event.currentTarget.value
        })
        const isAddedToCart = this.state.addedToCart;
        if (isAddedToCart) {
            store.dispatch(updateCartProductQuantity({
                id: this.state.data.id,
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
            },()=>{
                
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