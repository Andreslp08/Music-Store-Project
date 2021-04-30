import React from 'react'
import {Link, withRouter } from 'react-router-dom';
import { PAGE_ROUTES } from '../../models/PageRoutes';
import './ProductCard.css'
 class ProductCard extends React.Component{

    constructor(props){
        super(props);
        this.imgUrl = "data:image/jpeg;base64,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";
        this.imgRef = React.createRef();
        this.state ={
            data:{
                id: 1,
                section:"guitars", 
                name: "Product name", 
                imgPath: this.imgRef, 
                price: 0, 
                details: "Details", 
                isNew: true, 
                isPromo: false, 
                promo: "50% off",
                isSoldOut:true
            }
        }
        this.showProduct = this.showProduct.bind(this);
  }

    render(){
      const priceFormated = new Intl.NumberFormat().format(this.state.data.price);
      return(
            <div className="product-card">
                  {this.state.data.isPromo == true?
                  <div className="product-card-off">{this.state.data.promo}</div>:
                    null
                  }
                  {this.state.data.isNew == true?
                  <div className="product-card-new">New</div>:
                    null
                  }
                
                <div ref={this.imgRef} className="product-card-img"></div>
                {/* <img className="product-img" src={this.imgUrl}></img> */}
                <h2 className="color-onbackground p-1 text-center font-anton">{this.state.data.name || "Product name"}</h2>
                <h2 className="color-onbackground p-2 text-center ">${priceFormated}</h2>
                {this.state.data.isSoldOut == true?
                  <h2 className="color-error  p-1 text-center text-sm font-bold">Sold out</h2>:
                    null
                  }
                <button className="product-card-button" onClick={this.showProduct}><i className="fas fa-arrow-right"></i></button>
            </div>
        )
    }


    showProduct(){
      this.props.history.push(`${this.props.location.pathname}/${this.state.data.id}`);
    }

    componentDidMount(){
        this.imgRef.current.style.backgroundImage = `url(${this.imgUrl})`;
        this.configData();

    }

    configData(){
        if(this.props.data){
            this.setState({
                data:this.props.data
            })
        }
    }
}

export default withRouter(ProductCard);