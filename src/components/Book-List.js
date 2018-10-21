import React from 'react';

import Book from './Book';



export default function BookList(props) {

  if(props.loading){
    return <p>Loading...</p>;
  }


    if(props.userBooks.length < 1){
      return(
        <div>
        <p><strong>No Books Found! Why don't you create one?</strong></p>
        </div>
        )
    } 

    else {
      return (
        <div>
          {props.userBooks.map((book, i)=> <Book key={i} book={book} dispatch={props.dispatch}/> )}
        </div>
      );
    }
    
  
}
