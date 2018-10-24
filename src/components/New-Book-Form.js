import React, { Component } from 'react';


import NewBookSearch from './Book-Search';
import HeaderBar from './Header-Bar';
import { updateNewBookState, newBookErrorMessage, postNewBook } from '../actions/New-Book';
import { connect } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';


export class NewBookForm extends Component {
constructor(){
    super();
    this.state = {
        nuggetOne: '',
        nuggetTwo: '',
        nuggetThree: '',
     
    }
}





    handleChange(event) {
        this.setState({nuggetOne: event.target.value})
       
      }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('State',this.state);
        // Validate the status of the location
        
       // const takeAway = e.target.takeAway.value.trim();
        const takeAway = this.state.takeAways.trim();
    
        // Validate the required fields
        const requiredInfo = [nuggetOne];
        let requiredFields = ['nuggetOne'];
        for(let i = 0; i < requiredFields.length; i++){
          if (!requiredInfo[i]) {
            return this.props.dispatch(newBookErrorMessage(`Must include ${requiredFields[i]} for your new entry.`));
          }
        }
        // If location changes, reset the restaurant and event options
        //this.props.dispatch(createNewBookEntry({takeAway}))
          this.props.dispatch(postNewBook({
            ...this.props.newBook,
            nuggetOne,
            nuggetTwo,
            nuggetThree
          }));
          console.log('State',this.state);
       // this.props.nextPage();
      }
//<p className='error-message'>{this.props.bookState.errorMessage}</p>
    render(){
        return(

            <div className="new-book-form-container">
            
            <form
          id="bookform"
          name="bookform"
          className="book-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          

          <label htmlFor="bookTakeAways">Nugget #1</label>
          <input
           value={this.state.nuggetOne} 
          onChange={this.handleChange.bind(this)}
            type="text"
            id="nuggetOne"
            name="nuggetOne"
            //value=""
            //placeholder="enter text"
            // value={this.props.bookState.takeAway}
            
            // onChange={(e) => {
            //   this.props.dispatch(updateNewBookState({takeAway: e.target.value}));
            //   this.props.dispatch(newBookErrorMessage(null));
            // }}
          />
          <button type='submit' id='submit-new-entry'>Submit</button>
          <NewBookSearch dispatch={this.props.dispatch}/>
<label htmlFor="bookTitle">Title</label>
        <h6>{this.props.newBook.title}</h6>
</form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
newBook: state.newBook
})

export default withRouter(connect(mapStateToProps)(NewBookForm));


// <input type="text"
//         id="bookTitle"
//         name="bookTitle"
//         value={this.props.newBook.title}
//         />