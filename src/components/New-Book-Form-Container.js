import React, { Component } from 'react';

import NewBookForm from './New-Book-Form';
import NewBookSearch from './Book-Search';
import HeaderBar from './Header-Bar';
import { updateNewBookState, newBookErrorMessage, postNewBook } from '../actions/New-Book';
import { connect } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import { Nugget }  from './Nugget';
import ToggleButton from './partials/Toggle-Button';
import ToggleInput from './partials/Toggle-Input';

export class NewBookFormContainer extends Component {
constructor(){
    super();
    this.state = {
      nuggets:[],
     nuggetCount: 0
    }
}

//nuggets=[
  //nugget1: {
    //   fromPage: 75,
    //   toPage: 90,
    //   description: 'Awesome'
//}, 
// nugget2: {
//   fromPage: 75,
//   toPage: 90,
//   description: 'Great'
//]
// }

   updateFromPageState(event){
     console.log('Index', event.currentTarget.index);
     console.log('Event', event.target.value);
    const nuggetId = event.target.name;
    const inputValue = event.target.value;

const { index } = event.target;

let updateNugget =  {};

   // updateNugget.fromPage = _fromPage;
      
//nuggets[nuggetId].fromPage = fromPage;
const nuggets = [...this.state.nuggets];
nuggets[index].fromPage = inputValue;
        this.setState({nuggets
      });
 }
//  : [ 
//   this.state.nuggets[index].fromPage
//   ...this.state.nuggets, 
//   updateNugget
// ]


    handleSubmit = (e) => {
        e.preventDefault();
          this.props.dispatch(postNewBook({
            ...this.props.newBook,
            nuggets: this.state.nuggets
          }));
      }

addNugget = () => {

  const newNuggetCount = this.state.nuggetCount +1;
  const newNuggetId = 'nugget' + newNuggetCount;
  const newNuggetObject = {}
  newNuggetObject[{newNuggetId}] = '';

  this.setState({
    nuggetCount: newNuggetCount,
    nuggets: [...this.state.nuggets, 
                  newNuggetObject
    ]
  });
}
    render(){

let nuggetInputsDisplay, actionButtons;
if(this.props.newBook.title === ''){
  actionButtons = '';
} else {
  actionButtons = (
    <div className="action-buttons">
    <button type="button" onClick={this.addNugget}>Add Nugget</button>
          <button type='submit' id='submit-new-entry'>Submit</button>
          </div>
  )
}


if(this.state.nuggetCount > 0){
nuggetInputsDisplay = this.state.nuggets.map(  (nugget, i) => {
  const nuggetId = `nugget` + `${[i + 1]}`;
  return (
    <div key={nuggetId}>
    <label htmlFor="nuggetInput">{nuggetId}:</label>
    <br/>
    <span>from</span>
    <input
      placeholder="page"
      value={this.state.nuggets[i].fromPage} 
      onChange={(e) => this.updateFromPageState(e)}
      type="text"
      id={nuggetId}
      index={[i]}

  /><span>to</span>
   <input
   placeholder="page"
   value={this.state.nuggets[i].toPage}  
  onChange={this.upDateToPageState}
    type="text"
    id={nuggetId +  'toPage'}
    name={nuggetId}

  />
<ToggleInput text={["Add Description", "Add"]} method={this.fireAction} 
                    onChange={(e) => this.updateDescriptionState(e)}
                    value={this.state.nuggets[i].description}/>
  </div>
)
});
}

{/* <form
id="bookform"
name="bookform"
className="book-form"
onSubmit={e => this.handleSubmit(e)}
> */}
        return(

            <div className="new-book-form-container">
            
     
          {nuggetInputsDisplay}

          
          {actionButtons}
          <NewBookForm onSubmit={e => this.handleSubmit(e)} {...this.props}/>
          <NewBookSearch dispatch={this.props.dispatch}/>

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

//<label htmlFor="bookTitle">Title</label>
//<h6>{this.props.newBook.title}</h6>