import React from 'react';
import { shallow } from 'enzyme';
import { PostAddComponent } from './PostAdd';

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddComponent post={{'id': 1}} user={{'id': 1}} />);
    expect(component).toBeTruthy();
  });
});
