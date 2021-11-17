import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent posts={[{'created': 'loremTipsum'}, {'created': 'loremTipsum'} ]} user={{'id': 1}} />);
    expect(component).toBeTruthy();
  });
});
