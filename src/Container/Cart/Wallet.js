import React, { Component } from 'react'

export class Wallet extends Component {
    render() {
        return (
            <div className="boxdetail">
            <div className="netboxmain">
                <p className="netbanking">Wallet</p>
                <div className="banklogosbox">
                    <div className="bankindividual">
                        <input type="radio" name="bank" id="banklogo" value='phonepay' ></input>
                        <label htmlFor="phonepay"><img id='bankimage' src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg" alt="Reload" /></label>
                    </div>
                    <div className="bankindividual">
                        <input type="radio" name="bank" id="banklogo1" value='hdfc' ></input>
                        <label htmlFor="hdfc"><img id='bankimage2' src="https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg" alt="Reload" /></label>
                    </div>
                    <div className="bankindividual">
                        <input type="radio" name="bank" id="banklogo1" value='icici' ></input>
                        <label htmlFor="icici"><img id='bankimage2' src="https://www.logo.wine/a/logo/Google_Pay/Google_Pay-Logo.wine.svg" alt="Reload" /></label>
                    </div>
                    <div className="bankindividual">
                        <input type="radio" name="bank" id="banklogo" value='axis' ></input>
                        <label htmlFor="axis"><img id='bankimage' src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/upi.png" alt="Reload" /></label>
                    </div>
                </div>
            </div>
            <button className="paynow">PAY NOW</button>
        </div>
        )
    }
}

export default Wallet
