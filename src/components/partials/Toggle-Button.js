import React from 'react';

export default class  ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            displayInitialText: true
        };
    }
toggleText = () => {
this.setState({
    displayInitialText: !this.state.displayInitialText
});
return this.props.onClick();
}
render(){
    let buttonText;
    if(this.state.displayInitialText){
           buttonText = this.props.text[0];
      
    } else {
        buttonText = this.props.text[1];
    }
    return (
        <button htmlFor={this.props.text}
        type="button"
        onClick={this.toggleText }
        >{buttonText}</button>
     
    )
 
}


}


