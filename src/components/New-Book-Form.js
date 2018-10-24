import React, { Component } from 'react';


import NewBookSearch from './Book-Search';
import HeaderBar from './Header-Bar';
import { updateNewBookState, newBookErrorMessage, postNewBook } from '../actions/New-Book';
import { connect } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import { Nugget }  from './Nugget';

export class NewBookForm extends Component {
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
        console.log('State',this.state);
        // Validate the status of the location
        
       // const takeAway = e.target.takeAway.value.trim();
        //const nuggetOne = this.state.nuggets.trim();
    
        // Validate the required fields
        // const requiredInfo = [nuggetOne];
        // let requiredFields = ['nuggetOne'];
        // for(let i = 0; i < requiredFields.length; i++){
        //   if (!requiredInfo[i]) {
        //     return this.props.dispatch(newBookErrorMessage(`Must include ${requiredFields[i]} for your new entry.`));
        //   }
        // }
        // If location changes, reset the restaurant and event options
        //this.props.dispatch(createNewBookEntry({takeAway}))
          this.props.dispatch(postNewBook({
            ...this.props.newBook,
            nugget1: this.state.nugget1,
            nugget2: this.state.nugget2,
            nugget3: this.state.nugget3
          }));
          console.log('State',this.state);
       // this.props.nextPage();
      }

addNugget = () => {
  const newNuggetCount = this.state.nuggetCount +1;
  //const newNuggetKey = 'nugget'+ this.state.nuggetCount;
  this.setState({
    nuggetCount: newNuggetCount,
    nuggets: [...this.state.nuggets, '']
  });
}
  // this.setState( ({nuggetCount}, {nuggets}) => {
  //  return {
  //    nuggetCount: nuggetCount + 1,

    
  //   }
  // },
  // this.setState( ({nuggets}) => {
  //   return nuggets['nugget'+ this.state.nuggetCount] = '';
  // })
  // );


//<p className='error-message'>{this.props.bookState.errorMessage}</p>
    render(){
//       let nuggetInputs;
      
//  for(let i=0; i < this.state.nuggetCount; i--){
//    let nuggetNumber = 'nugget'+`${[i]}`;
//   nuggetInputs += ( 
//     <div>
//   <label htmlFor="bookTakeAways">{'Nugget #' + `${[i]}`}</label>
//           <input
//            value={this.state[nuggetNumber]} 
//           onChange={this.handleChange.bind(this)}
//             type="text"
//             id="nuggetTwo"
//             name="nuggetTwo"
//           />
//           </div>
// )
// } 
let nuggetInputsDisplay;
if(this.state.nuggetCount > 0){
console.log('Nuggets', this.state.nuggets);
nuggetInputsDisplay = this.state.nuggets.map(  (nugget, i) => {
  const nuggetId = `Nugget ` + `${[i + 1]}`;
  console.log(i);
return (
<div>
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







{/* <label htmlFor="bookTakeAways">Nugget #1</label>
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
         */}
   
        return(

            <div className="new-book-form-container">
            
            <form
          id="bookform"
          name="bookform"
          className="book-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          {nuggetInputsDisplay}

          
          <button onClick={this.addNugget}>Add Nugget</button>
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



// nuggetCount = this.state.nuggetCount + 1;

// nuggets = this.state.nuggets

// nuggets['nugget'+nuggetCount] = '';

// this.setState({nuggetCount:nuggetCount, nuggets:nuggets});