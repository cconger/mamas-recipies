import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './components/navigation.js';

import router from './router';

window.Application = {
  router
};

window.addEventListener('load', () => {
  let navigationTarget = document.getElementById('navigation');
  ReactDOM.render(<Navigation />, navigationTarget);

  router.initApplication();
});
