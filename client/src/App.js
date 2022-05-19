import React from 'react';
import store from './store';
import Base from './Base.jsx';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Base />
      </Router>
    </Provider>
  );
}

export default App;
