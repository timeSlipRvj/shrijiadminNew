import './Addblog.css'
import React, { Component } from 'react'

export class AddBlog extends Component {
    render() {
        return (
            <div>
                <button style={{ outline: 'none' }} type="button" className="btn add_blog" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    + ADD A BLOG (Review any product of any brand)
                </button>

                <div style={{ background: ' rgb(0,0,0,0.7)' }} className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div style={{ marginTop: '34%' }} className="modal-content">
                            <div style={{ borderBottom: 'none' }} className="modal-header">
                                <h5 className="Heading_add_blog" id="exampleModalLabel">BLOG SECTION</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                            </div>
                            <div style={{
                                borderTop: 'none', paddingBottom: "1vw",
                                paddingLeft: "0"
                            }} className="modal-footer">
                                <button type="button" className="btn cancelBlog" data-bs-dismiss="modal">Cancel Blog</button>
                                <button type="button" className="btn shareblog">Share blog</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddBlog
