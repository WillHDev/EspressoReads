import React, { Component } from 'react';

import { connect } from 'react-redux';
import NewBookForm from './New-Book-Form';
import HeaderBar from './Header-Bar';
import { FaDivide } from 'react-icons/fa';


export default class NewBookContainer extends Component {

    render(){
        return(

            <div className="new-book-container">
            <HeaderBar />
            <h2>Add a New Entry</h2>
            <NewBookForm />
            
            </div>
        )
    }

}