import React, { Component } from 'react';


export default class NewBookForm extends Component {
    constructor(){
        super();
        this.state = {
                expandDescription: false
        }
    }


expandDescription = () => {
    this.setState({
        expandDescription: !this.state.expandDescription
    })
}
render(){
    const { title, image, description, id} = this.props.newBook;
    return (
        <div className="new-book-form">
       <a > <div className="book-image" 
                  style={
                    {background:`url(${image === '' ? './images/bird.jpg': image} )`
                  , backgroundSize:'cover'}} >
                
               </div>
               </a>
        <label htmlFor="bookTitle">Title</label>
        <h6>{title}</h6>
        <button htmlFor="bookDescription"
        type="button"
        onClick={this.expandDescription}
        >Show Description</button>
        {this.state.expandDescription ? 
        <input
        value={description}
        id={id}
    />  : ''}



        </div>
    )
}

}