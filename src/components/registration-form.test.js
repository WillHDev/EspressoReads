import React from 'react';
import {RegistrationForm} from './Registration-Form'
import {shallow} from 'enzyme';



describe('<RegistrationForm />', () => {

  let props;

  beforeEach(() => {
    const dispatch = jest.fn();
    const handleSubmit = jest.fn();

    let errorMessage = '';
    props = {dispatch, handleSubmit, errorMessage};
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<RegistrationForm {...props} />);
  });

});