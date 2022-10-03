import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from '../../src/containers/SignUp';
import store from '../../src/store';
import {Provider} from 'react-redux';

describe('SignUp screen', () => {
  it('SignUp screen', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SignUp />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
