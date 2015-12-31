import React from 'react';
import ReactDOM from 'react-dom';

import RecipeWrapper from '../components/recipe-wrapper.js';
import recipe from '../fixtures/recipe.js';

export default class RecipeRoute {
  constructor(props) {
    this.model = null;
    this.editing = false;
  }

  activate (params, queryParams) {
    this.model = recipe;
    this.editing = false;
    this.render();
  }

  render () {
    let applicationTarget = document.getElementById('applicationPane');

    ReactDOM.render(
      <RecipeWrapper
        recipe={this.model}
        editing={this.editing}
      />,
      applicationTarget
    );
  }

  send (action, ...params) {
    console.log("Got action", action, params);
    // This is where flux would prevent the render from happening until all
    // store updates happened;
    switch (action) {
      case "edit":
        this.editing = true;
        break;
      case "saveEdit":
        // Update the model
        this.editing = false;
        break;
      case "cancelEdit":
        this.editing = false;
        break;
    }
    this.render();
  }

  cleanUp() {
    console.log("cleaning up route");
    //Return a promise if you want to delay transition;
  }
}
