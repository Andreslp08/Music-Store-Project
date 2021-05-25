
import React from 'react';
import { withRouter} from 'react-router-dom';

class Cart extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="below-navbar min-h-offset color-onbackground">
            <h2 className="font-bebas color-onbackground text-6xl p-2">Cart</h2>
        </div>
        )
    }
}

export default withRouter(Cart);
