import reducer, {saveUserDetails} from '../../src/slices/loginSlice';

describe('test login slice', () => {
  const initialState = {
    userData: {},
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should add the user details in state', () => {
    expect(
      reducer(
        initialState,
        saveUserDetails({
          userData: {
            id: 1,
            name: 'Test user',
          },
        }),
      ),
    ).toEqual({
      userData: {
        id: 1,
        name: 'Test user',
      },
    });
  });
});
