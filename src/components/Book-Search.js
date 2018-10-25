import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateNewBookState, newBookErrorMessage } from '../actions/New-Book';
import HeaderBar from './Header-Bar';
import { FaDivide } from 'react-icons/fa';
import $ from 'jquery';
import ToggleButton from './partials/Toggle-Button';

export default class NewBookSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchTerm: '',
            booksToDisplay: null,
            showSearchInput: false,
            expandDescription: {}
        };
    }
    
    searchBooks(event) {
        event.preventDefault();

        const text = this.textInput.value.trim();
 
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + text,
            dataType: "json",
            success: function(data){
              
                // this.setState( 
                //     ({data})=>{
                //     console.log('2', data);
                //     return ({booksToDisplay: data});
                // }
                //)
                // this.setState({ booksToDisplay: data.items });
                this.upDateStateWithFetchedBooks(data.items);
            }.bind(this),
            type: 'GET'
        });
        this.textInput.value = '';
        //console.log('state',this.state);
    }
    upDateStateWithFetchedBooks = (items) => {
        this.setState({ booksToDisplay: items});
    }
selectBook(id){
     const selectedBook = this.state.booksToDisplay.find(book =>{
return book.id === id;
    });

    const { title, authors, categories, description, infoLink,
   } = selectedBook.volumeInfo;
const { thumbnail } = selectedBook.volumeInfo.imageLinks;

    //console.log('SelectedBook', selectedBook);
this.props.dispatch(updateNewBookState({
errorMessage: '', 
id: id,
    title: title,
    authors: authors,
    image: thumbnail,
    description: description,
    Url: infoLink,
    tags: categories
})
);
this.setState(({booksToDisplay})=>{
    return {booksToDisplay: null};
})

}
showSearchInput = () => {
    this.setState(({showSearchInput}) => {
        return { showSearchInput: !showSearchInput}
    })
}
expandDescription = (id) => {
    // this.setState({
    //     expandDescription: !this.state.expandDescription[id]
    // })
if(!this.state.expandDescription.id){ 

    return this.setState({expandDescription: {...this.state.expandDescription, id: true }});
}
   return this.setState({expandDescription: {...this.state.expandDescription, id: !this.state.expandDescription.id }})
}


addNewBookDescriptionToggle(id){
    this.setState({ 
        expandDescription: { ...this.state.expandDescription, 
   id: false }
});

        this.expandDescription[id] = false
     
}
    render(){

        let showBooks, showSearchInput, showToggleButton, descriptionButton;
        if(this.state.booksToDisplay !== null){
            showBooks = this.state.booksToDisplay.map( item => {
                const { id } = item;

                // this.addNewBookDescriptionToggle(id);
             
                const { title, authors, categories, description, infoLink,
                        previewLink } = item.volumeInfo;
                const { thumbnail } = item.volumeInfo.imageLinks;
                   
                    console.log('ID', id);
             return (
                 <li key={id} className="book-listing" onDoubleClick={() => this.selectBook(id)}>
             <div>{title}</div>
             <div>{authors}</div>
             <div>{categories}</div>

   

<ToggleButton   text={["Show Description", "Hide Description"]}
                onClick={(id) => this.expandDescription(id)}

/>
        {( this.state.expandDescription.id  )? 
        <p>{description}</p> : '' }
             <div>
             <a href={infoLink}> {thumbnail} </a></div>
             <div><a href={previewLink}>
             Preview
             </a></div>
            <a > <div className="book-image" 
                  style={
                    {background:`url(${thumbnail === '' ? './images/bird.jpg': thumbnail} )`
                  , backgroundSize:'cover'}} >
                
               </div>
               </a>
        
             </li>
             )
            })
        }
if(this.state.showSearchInput === false){
showToggleButton = <button id="button" type="button" onClick={this.showSearchInput}>Search Books</button>
} else { 
    showToggleButton = '';
    showSearchInput = (
<form onSubmit={(e) => this.searchBooks(e)}>
                        <input id="search" ref={input => this.textInput = input} />

                        <button id="button" type="button" onClick={this.showSearchInput}>Search</button>
                        <div id="results">
                        <ul>
                        {showBooks}
                        </ul>
                        </div>
                        </form>
    )
}


        return(

            <div className="new-book-search-container">
      <div className="parent">
                
                    <h2>Find a Book</h2>
                    <div>
                    {showToggleButton}
                        {showSearchInput}
                    </div>
                </div>
            
            </div>
           
            )
            }
            }


