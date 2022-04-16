import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { siteUrl} from '../../../Utils/util'

class Slider extends Component {
    render() {
        return (
            <div>
                {/* <div className="video_container"> */}
                    {/* <img src="https://images.unsplash.com/photo-1556740772-1a741367b93e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3Ryb25pY3MlMjBzaG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="RELOAD" /> */}
                    <Carousel  fade={this.props.settings.Fade} controls={this.props.settings.Arrows} interval={this.props.settings.Autoplay? this.props.settings.AutoplaySpeed:null}>
                      {this.props.slides.map((slide,key)=>{
                          const background = slide.Image.image? siteUrl+slide.Image.image: "https://via.placeholder.com/150"
                          return <Carousel.Item interval={3000} key={key}>
                              <div className="d-block w-100 video_container" style={{background: `url("${background}")`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}></div>
                          {/* <img
                              className="d-block w-100 video_container"
                              src={slide.Image.image? siteUrl+slide.Image.image: "https://via.placeholder.com/150"} 
                              alt="First slide"
                          /> */}
                          <Carousel.Caption className="slider_caption">
                              <h3>{slide.General.Caption1}</h3>
                              <p>{slide.General.Caption2}</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                      })}
                        
                    </Carousel>
                {/* </div> */}
                {/* <video className='video_container' muted="true" autoplay playsinline loop  >
                    <source src="https://giant.gfycat.com/VerifiableTerrificHind.mp4" type="video/mp4" />
                    <source src="https://giant.gfycat.com/VerifiableTerrificHind.webm" type="video/webm" />
                </video> */}
            </div>

        )
    }
}

export default Slider
