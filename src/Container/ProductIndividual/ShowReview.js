import { AiFillStar } from "react-icons/ai";
import React, { Component } from 'react'

 class ShowReview extends Component {

    render() {
        return (
            <div className="showReview">
            <div className="userNameReview">
                <div className="roundCircle">
                    <img alt='reload' src="https://images.unsplash.com/photo-1606247193592-53da505571f8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                </div>
                <div className="personName">{this.props.review.reviewerName}</div>
                <div className="reviewNo">{this.props.review.rating}</div>
                <AiFillStar
                    className="show_review_star"
                    style={{
                        height: "1.245vw",
                        width: "1.245vw",
                        marginLeft: "0.293vw",
                        marginTop: "0.220vw",
                        color: "#ffff00",
                    }}
                />
            </div>
            <p className="reviewShow">
               {this.props.review.comment}
                    </p>
            {/* <div className="reviewImage">
                <img alt='reload' src="https://images.unsplash.com/photo-1607359390930-206a99777fa1?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
            </div> */}
        </div>
        )
    }
}

export default ShowReview
