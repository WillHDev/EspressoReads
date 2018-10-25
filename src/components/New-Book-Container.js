import React, { Component } from 'react';

import { connect } from 'react-redux';
import NewBookFormContainer from './New-Book-Form-Container';
import HeaderBar from './Header-Bar';
import { FaDivide } from 'react-icons/fa';


export default class NewBookContainer extends Component {

    render(){
        return(

            <div className="new-book-container">
            <HeaderBar />
            <h2>New Entry</h2>
            <NewBookFormContainer />
            
            </div>
        )
    }

}