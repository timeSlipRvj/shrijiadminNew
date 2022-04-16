import Product from '../Product';
import React, { Component } from 'react'

class ProductRowBox extends Component {
    render() {
        return (
            <div>
               <div className="find_by_category_box">
                    <p className="most_viewd_text">{this.props.tab.Title}</p>
                    <hr id="line_category"></hr>
                </div>
                <div className="new_arrival_box">
                    {this.props.tab.Products.map((product,key)=>{
                        return <Product key={key} product={product} category={false}/>
                    })}
                </div> 
            </div>
        )
    }
}

export default ProductRowBox
