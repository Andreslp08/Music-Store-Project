import React, { useEffect } from 'react'
import { ProductsController } from '../../controllers/ProductsController';
import { ProductCard } from '../product-card/ProductCard';


export class ProductsSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        this.filterOptions = {
            noFilters: "No filters",
            az: "A-Z",
            za: "Z-A",
            minMax: "Min-price - Max-price",
            maxMin: "Max-price - Min-price",
            new: "New",
            promo: "Promo"
        }

        this.onSelectFilter = this.onSelectFilter.bind(this);
    }

    componentDidMount() {
       this.loadProducts();
        //defaulut filter
        this.filterProducts(this.filterOptions.noFilters)
    }


    render() {
        return (
            <section className="relative flex flex-col w-full min-h-screen">
                <section className="flex flex-wrap justify-between">
                    <h3 className="color-onbackground text-center text-3xl sm:text-5xl m-3 font-anton">{this.props.sectionName.toUpperCase()  || "Section"}</h3>
                    <div className="flex flex-wrap items-center m-3">
                        <h3 className="color-onbackground p-2">Filter: </h3>
                        <select onChange={this.onSelectFilter} className="cursor-pointer bg-primary color-onprimary rounded-full p-1 border-none font-roboto font-light">
                            <option value={this.filterOptions.noFilters}>{this.filterOptions.noFilters}</option>
                            <option value={this.filterOptions.az}>{this.filterOptions.az}</option>
                            <option value={this.filterOptions.za}>{this.filterOptions.za}</option>
                            <option value={this.filterOptions.minMax}>{this.filterOptions.minMax}</option>
                            <option value={this.filterOptions.maxMin}>{this.filterOptions.maxMin}</option>
                            <option value={this.filterOptions.new}>{this.filterOptions.new}</option>
                            <option value={this.filterOptions.promo}>{this.filterOptions.promo}</option>
                        </select>
                    </div>
                </section>
                <section className="flex items-center flex-row flex-wrap justify-center flex-grow">
                    {this.state.products}
                </section>

            </section>
        )

    }



    onSelectFilter(event) {
        const optionValue = event.target.value;
        this.filterProducts(optionValue)
    }


    filterProducts(filterOption) {
        this.props.productsData.then((res) => {
            let filteredList = [];
            switch (filterOption) {
                case this.filterOptions.noFilters:
                    filteredList = res.sort(function (a, b) { return a.id - b.id })
                    break;
                case this.filterOptions.az:
                    filteredList = res.sort(function (a, b) { if(a.name > b.name){return 1}else{return -1} return 0 })
                    break;
                case this.filterOptions.za:
                    filteredList = res.sort(function (a, b)  { if(b.name > a.name){return 1}else{return -1} return 0 })
                    break;
                case this.filterOptions.maxMin:
                    filteredList = res.sort(function (a, b) { return b.price - a.price })
                    break;
                case this.filterOptions.minMax:
                    filteredList = res.sort(function (a, b) { return a.price - b.price })
                    break;
                case this.filterOptions.new:
                    filteredList = res.filter((value, index, array) => { return value.isNew });
                    break;
                case this.filterOptions.promo:
                    filteredList = res.filter((value, index, array) => { return value.isPromo });
                    break;
                default:
                    filteredList = res.sort(function (a, b) { return a.id - b.id })
                    break;
            }
            if( filteredList <= 0){
                this.setState({
                    products:this.loadError("Empty")
                })
                return;
            }
            this.setState({
                products: filteredList.map((value, index, array) => {
                    return <ProductCard key={`product-${value.id}`} data={value} />
                })
            })
        }).catch(res => {
            this.setState({
                products: this.loadError(res)
            })
        })
    }

    loadProducts() {
        if (this.props.productsData != null || this.props.productsData != undefined) {
            this.props.productsData.then((res) => {
                this.setState({
                    products: res.map((value, index, array) => {
                        return <ProductCard key={`product-${value.id}`} data={value} />
                    })

                })
            })
                .catch(res => {
                    this.setState({
                        products: this.loadError(res)
                    })
                })
        }
        else {
            this.setState({
                products: this.loadError("Empty")
            })
        }
    }

    loadError(error){
        return <p className="color-onbackground font-dosis">{error}</p>
    }
}