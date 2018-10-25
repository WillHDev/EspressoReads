import React, { Component } from 'react';

import NewBookForm from './New-Book-Form';
import NewBookSearch from './Book-Search';
import HeaderBar from './Header-Bar';
import { updateNewBookState, newBookErrorMessage, postNewBook } from '../actions/New-Book';
import { connect } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import { Nugget }  from './Nugget';

export class NewBookFormContainer extends Component {
constructor(){
    super();
    this.state = {
      nuggets:[],
     nuggetCount: 0
    }
}

//{nugget1:''}   this.state.nuggets.map



    handleChange(event) {
        this.setState({nuggetOne: event.target.value})
       
      }
    handleSubmit = (e) => {
        e.preventDefault();
          this.props.dispatch(postNewBook({
            ...this.props.newBook,
            nuggets: this.state.nuggets
          }));
      }

addNugget = () => {
  const newNuggetCount = this.state.nuggetCount +1;
  this.setState({
    nuggetCount: newNuggetCount,
    nuggets: [...this.state.nuggets, '']
  });
}
    render(){

let nuggetInputsDisplay;
if(this.state.nuggetCount > 0){
nuggetInputsDisplay = this.state.nuggets.map(  (nugget, i) => {
  const nuggetId = `Nugget ` + `${[i + 1]}`;
return (
<div key={nuggetId}>
  <label htmlFor="nuggetInput">{nuggetId}</label>
  <input
   value={this.state.nuggets[i]} 
  onChange={this.handleChange.bind(this)}
    type="text"
    id={nuggetId}
    name={nuggetId}

  />
  </div>
)
});
}
        return(

            <div className="new-book-form-container">
            
            <form
          id="bookform"
          name="bookform"
          className="book-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          {nuggetInputsDisplay}

          
          <button type="button" onClick={this.addNugget}>Add Nugget</button>
          <button type='submit' id='submit-new-entry'>Submit</button>
          <NewBookForm {...this.props}/>
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

export default withRouter(connect(mapStateToProps)(NewBookFormContainer));


// nuggetCount = this.state.nuggetCount + 1;

// nuggets = this.state.nuggets

// nuggets['nugget'+nuggetCount] = '';

// this.setState({nuggetCount:nuggetCount, nuggets:nuggets});