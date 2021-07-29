
import React, { ReactDOM } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PAGE_ROUTES } from '../../models/PageRoutes';
import './ProductAdded.css';
import { ProductsController } from '../../controllers/ProductsController'
import store from '../../redux/store/Store';
import { addProductToCart, addProductToFavorite, removeProductFromCart, removeProductFromFavorites, updateCartProductQuantity } from '../../redux/actions/ProductActions';
import TwoStateButton from '../two-state-button/TwoStateButton';

class ProductAdded extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            mounted:false,
            addedToCart:false,
            addedToFavorites:false,
            data: {
                id: 1,
                name: "Guitarra Eléctrica Gibson Les Paul Custom 2018, Eboony LPC-PSL11051",
                price: 2500,
                mainImgPath: "https://images.unsplash.com/photo-1617165162694-9703691c370b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                quantity: 3
            },
            visibility: {
                img: true,
                priceText: true,
                quantityInput: true,
                buyButton: true,
                cartButton: true,
                favoriteButton: true,
                deleteButton: true
            }
        }
        this.quantityInputChangeHandler = this.quantityInputChangeHandler.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.onCartButtonClick = this.onCartButtonClick.bind(this);
        this.onFavoriteButtonClick = this.onFavoriteButtonClick.bind(this);
    }


    componentDidMount() {        
        this.initialCartButtonState();
        this.initialFavoriteButtonState();
        this.loadProductData();
        this.visibilityHandler();
        // fuck
        this.setState({
            mounted:true
        })
        
    }


    render() {
        const { id, name } = this.state.data;
        return (
            <div className="productAdded flex-none">
                <div className="flex">
                    {this.Image()}
                    <div className="flex flex-grow flex-wrap items-center justify-around">
                        <Link className="primary-link w-full font-anton text-center m-2 cursor-pointer" to={this.getProductRoute()}>{name}</Link>
                        {this.Price()}
                        {this.QuantityInput()}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-center justify-center">
                        {this.BuyButton()}
                        {this.CartButton()}
                        {this.FavoriteButton()}
                    </div>
                    {this.DeleteButton()}
                </div>
            </div>
        )
    }


    Image() {
        const { img } = this.state.visibility;
        const { mainImgPath } = this.state.data;
        return (
            img == true ?
                <img className="productAdded-img" src={mainImgPath}></img>
                : null
        )

    }

    QuantityInput() {
        const { quantityInput } = this.state.visibility;
        const { quantity } = this.state.data;
        return (
            quantityInput == true ?
                <div className="flex items-center justify-center m-2">
                    <p className="color-onbackground text-sm">Quantity: </p>
                    <input type="number" className="p-2 m-2 text-center text-xs rounded-full w-20 border-solid border-black border-2 text-black" onChange={this.quantityInputChangeHandler} value={quantity} min="1" max="1000" step="1" placeholder="Quantity" />
                </div>
                : null
        )
    }

    Price() {
        const { priceText } = this.state.visibility;
        const { price } = this.state.data;
        const formattedPrice = `$${new Intl.NumberFormat().format(price)}`;
        return (
            priceText == true ?
                <p className="color-onbackground text-2xl">{formattedPrice}</p>
                : null
        )
    }

    BuyButton() {
        const { buyButton } = this.state.visibility;
        return (
            buyButton == true ?
                <button className="primary-button rounded-full">Buy now</button>
                : null
        )
    }
    CartButton() {
        const { cartButton } = this.state.visibility;
         return (
            cartButton == true && this.state.mounted?
            <TwoStateButton  iconClass = {"fas fa-shopping-cart"} id="h1" showIcon ={true} active={this.state.addedToCart} defaultText={"Add to"} activeText ={"Added to"} onClick={this.onCartButtonClick}  />
            : null
            )
    }

    FavoriteButton() {
        const { favoriteButton } = this.state.visibility;
        return (
            favoriteButton == true && this.state.mounted?
                <TwoStateButton  iconClass = {"fas fa-star"} id="h2" showIcon ={true} active={this.state.addedToFavorites} defaultText={"Add to"} activeText ={"Added to"}  onClick={this.onFavoriteButtonClick} />
                : null
        )
    }

    DeleteButton() {
        const { deleteButton } = this.state.visibility;
        return (
            deleteButton == true ?
                <button className="button-red rounded-full text-xs"><i className="fas fa-trash fa-lg" onClick={this.deleteProduct}></i></button>
                : null
        )
    }


    deleteProduct(event){
        if( this.props.deleteAction){
            this.props.deleteAction();
        }
    }
    
    quantityInputChangeHandler(event) {
        this.setState({
            data:{...this.state.data, 
                quantity:parseInt(event.currentTarget.value)
            }
        })
        store.dispatch(updateCartProductQuantity({
            id: this.state.data.id,
            quantity: parseInt(event.currentTarget.value)
        }))
    }

    loadProductData() {
        if (this.props.productId) {
            ProductsController.getProductById(this.props.productId).then((res) => {
                this.setState({
                    data: {
                        ...res,
                        quantity: this.props.quantity || 1
                    }
                })
            }).catch(error => {

            });
        }
    }

    getProductRoute() {
        return `${PAGE_ROUTES.products.all}/${this.state.data.id}`;
    }

    visibilityHandler() {
        if (this.props.visibility != null && this.props.visibility != undefined) {
            const { visibility } = this.props;
            this.setState({
                visibility: {
                    img: visibility.img != undefined ? visibility.img : true,
                    priceText: visibility.priceText != undefined ? visibility.priceText : true,
                    quantityInput: visibility.quantityInput != undefined ? visibility.quantityInput : true,
                    buyButton: visibility.buyButton != undefined ? visibility.buyButton : true,
                    cartButton: visibility.cartButton != undefined ? visibility.cartButton : true,
                    favoriteButton: visibility.favoriteButton != undefined ? visibility.favoriteButton : true,
                    deleteButton: visibility.deleteButton != undefined ? visibility.deleteButton : true,
                }
            })
        }
    }

    initialCartButtonState(){
        const {productId} = this.props || 1;
        let isProductAdded = store.getState().cart.find((product, index, array)=> product.id == productId?true:false)
            this.setState({
                addedToCart:isProductAdded
            })
    }

    onCartButtonClick(isActivated){
        if( isActivated){
            store.dispatch(addProductToCart({
                id:this.state.data.id,
                quantity: parseInt(this.state.data.quantity) 
              }))
        }
        else{
            store.dispatch(removeProductFromCart(this.state.data.id));
        }
    }

    initialFavoriteButtonState(){
        const {productId} = this.props || 1;
        let isProductAdded = store.getState().favorites.find((product, index, array)=> product.id == productId?true:false)
            this.setState({
                addedToFavorites:isProductAdded
            })
    }

    onFavoriteButtonClick(isActivated){
        if( isActivated){
            store.dispatch(addProductToFavorite({
                id:this.state.data.id,
                quantity: parseInt(this.state.data.quantity) 
              }))
        }
        else{
            store.dispatch(removeProductFromFavorites(this.state.data.id));
        }
    }

}

export default withRouter(ProductAdded);
