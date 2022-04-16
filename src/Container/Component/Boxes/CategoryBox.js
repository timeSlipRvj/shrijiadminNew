import Product from '../Product'
import React, { Component } from 'react'

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
class CategoryBox extends Component {
    state={
        start:[0,0,0,0],
        end:[2,2,2,2],
        load: false
    }
    
    render() {
        return (
            this.props.tab.SectionStatus ?
            <React.Fragment>
                
                <div className="find_by_category_box">
                    <p className="most_viewd_text">{this.props.tab.SectionTitle}</p>
                    <hr id="line_category"></hr>
                </div>
                <div className='category_dash_outer_box'>

                {this.props.tab?.Categories?.map((item,key)=>{
                    return <div className="category_dash" key={key}>
                    <div className="particular_category_choice">
                        <p>{item.Category?.name}</p>
                        <hr id="line_for_particular_box_category"></hr>
                        <div id="arrow_box_1">
                            <IoIosArrowBack id="Arrow_forward" onClick={(e)=>{
                                this.setState({load: true})
                                let newstart = this.state.start
                                let newend = this.state.end
                                newstart[key] = newstart[key]-2;
                                newend[key] = newend[key]-2
                            this.setState({start: newstart, end: newend},()=>this.setState({load: false}));
                        }}/>
                            <IoIosArrowForward id="Arrow_backward" onClick={(e)=>{
                                this.setState({load: true})
                                let newstart = this.state.start
                                let newend = this.state.end
                                newstart[key] = newstart[key]+2;
                                newend[key] = newend[key]+2
                            this.setState({start: newstart, end: newend},()=>this.setState({load: false}));
                        }}/>
                        </div>
                    </div>
                    {!this.state.load && item.Products?.slice(this.state.start[key], this.state.end[key]).map((product,key)=>{
                        return <Product key={key} category={false} product={product}/>
                    })}
                    {item.Products?.slice(this.state.start[key], this.state.end[key]).length == 0 && <div className="text-center p-2">No Products Found</div>}
                    </div>
                })}
                    
                </div>
            </React.Fragment>: <React.Fragment></React.Fragment>
        )
    }
}

export default CategoryBox
