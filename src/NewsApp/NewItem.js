import React, { Component } from 'react';

export default class NewItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
        return (
            <div>
                <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}<span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'80%', zIndex:'1'}}>
                        {source}
                        <span class="visually-hidden">unread messages</span>
                    </span></h5>
                  <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-mutex">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
                </div>
                </div>
                
            </div>
        )
    }
}
