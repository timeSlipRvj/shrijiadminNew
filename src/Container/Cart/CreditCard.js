import React, { Component } from 'react'

export class CreditCard extends Component {
    render() {
        return (
            <div>
                <div className="creditDetail">
                    <p className="creditpara">CREDIT CARD</p>
                    <input type="text" className="inputBoxCard" placeholder="CARD NUMBER" />
                    <div className="monthyearbox">
                        <input type="text" className="monthimput" placeholder="EXPIRY MONTH" />
                        <input type="text" className="monthimput" placeholder="EXPIRY YEAR" />
                    </div>
                    <div className="monthyearbox">
                        <input type="text" className="monthimput" placeholder="CVV" />
                        <p className="cvv">Last 3 digits on the back side of your card</p>
                    </div>
                    <input type="text" className="inputBoxCard" placeholder="NAME ON THE CARD" />
                </div>
                <p className="check_box1">
                    <label className="containerCheck">
                        Save the bank details for faster payments ahead
                        <input type="checkbox"></input>
                        <span className="checkMark"></span>
                    </label>
                </p>
                <button className="paynow">PAY NOW</button>
            </div>
        )
    }
}

export default CreditCard
