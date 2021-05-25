
import React from 'react';
import { withRouter} from 'react-router-dom';
import ProductAdded from '../product-added/ProductAdded';

class Favorites extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="below-navbar min-h-offset color-onbackground">
                <h2 className="font-bebas color-onbackground text-6xl p-2">Favorites</h2>
            <div>
                <ProductAdded visibility={{ favoriteButton:false}}/>
                <ProductAdded visibility={{ cartButton:false}}/>
                <ProductAdded visibility={{ cartButton:false, favoriteButton:false, deleteButton:false, quantityInput:false}}/>
                <ProductAdded visibility={{ cartButton:false, favoriteButton:false, deleteButton:false, quantityInput:false, priceText:false}}/>
                <ProductAdded visibility={{ cartButton:false, favoriteButton:false, deleteButton:false, quantityInput:false, buyButton:false}}/>
            </div>
            </div>
        )
    }
}


export default withRouter(Favorites);
