import Product from '../Product';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { Component } from 'react'

class CategoryRowBox extends Component {
    state={
        select: {},
        products: [],
        tabs: [],
        start: 0,
        end: 4,
        loading: false,
    }
    componentDidMount(){
        const {select, tabs} = this.state;
        this.props.products?.Tabs?.forEach(tab =>{
            select[tab._id] = tab.Products
            let tmp = {
                id: tab._id,
                title: tab.Title,
            }
            tabs.push(tmp);
        })
        this.setState({select, tabs, products: select[Object.keys(select)[0]]});
    }
    render() {
        return (
            this.props.products.SectionStatus ?
            <React.Fragment>
                <div className="new_Arrivals">
                    <p className="most_viewd_text">New Arrivals</p>
                    <hr id="line_1"></hr>
                    <div className="list_names">
                        <ul>
                            {this.state.tabs.map((tab,key)=>{
                                return <li className="px-md-1 px-lg-3" key={key} onClick={(e)=>{
                                    this.setState({products: this.state.select[tab.id], start: 0})
                                }}>{tab.title}</li>
                            })}
                            
                        </ul>
                    </div>
                    <div id="arrow_box">
                        <IoIosArrowBack id="Arrow_forward"onClick={(e)=>{
                            this.setState({load: true})
                            this.setState({start: this.state.start-4, end: this.state.end -4},()=>this.setState({load: false}))
                        }} />
                        <IoIosArrowForward id="Arrow_backward" onClick={(e)=>{
                            this.setState({load: true})
                            this.setState({start: this.state.start+4, end: this.state.end+4},()=>this.setState({load: false}))
                        }}/>
                    </div>
                </div>
                <div className="new_arrival_box">
                    {!this.state.load && this.state.products?.slice(this.state.start, this.state.end).map((product,key)=>{
                        return <Product key={key} product={product} category={false}/>
                    })}
                    {(this.state.products.length == 0 || this.state.products?.slice(this.state.start, this.state.end).length == 0)  && <div>No Products Found</div>}
                   
                </div>
                </React.Fragment>: <React.Fragment></React.Fragment>
    
        )
    }
}

export default CategoryRowBox
