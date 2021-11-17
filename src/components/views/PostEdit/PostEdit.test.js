import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent post={{'id': 1}} user={{'id': 1}} admin={{'id': 1}} />);
    expect(component).toBeTruthy();
  });
});
