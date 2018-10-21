import React from 'react';
import {LandingPage} from './Landing-Page'
import {shallow} from 'enzyme';



describe('<LandingPage />', () => {

  test.only('renders without crashing', () => {
    const wrapper = shallow(<LandingPage />);
  });

});