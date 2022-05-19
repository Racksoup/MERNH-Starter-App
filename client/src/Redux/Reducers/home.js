import {} from '../Actions/types.js';

const initialState = {
  home: [],
};

export default function home(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
