import React from 'react';

import  App  from './App';
import { Route } from 'react-router-dom';

import { shallow } from 'enzyme';



describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('displays a <Route /> component when rendered', () => {
    const wrapper = shallow(<App />, {disableLifecycleMethods: true});
    const routes = wrapper.find(Route);
    expect(routes.length).toEqual(1);
  });

})



