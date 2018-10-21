import React from 'react';



export default class Book extends React.Component{

render(){
    return(
        <div className="book">
        <h4>{this.props.book.title}</h4>
        <h6>{this.props.book.subtitle}</h6>
        <h6>{this.props.book.author}</h6>
        <h6>{this.props.book.description}</h6>
            <img className="book-image" src={this.props.book.image}/>
           
                
            
            
        </div>
    )
}

}