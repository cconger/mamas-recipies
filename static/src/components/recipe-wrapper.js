import React from 'react';
import RecipeSettings from './recipe-settings';
import EditableRecipe from './recipe-editing';
import Recipe from './recipe';

export default class RecipeWrapper extends React.Component {
  render () {
    return (
      <div>
        <RecipeSettings />
        {( () => {
          if (this.props.editing) {
            return <EditableRecipe recipe={this.props.recipe} />;
          } else {
            return <Recipe recipe={this.props.recipe} />;
          }
        })()}
      </div>
    );
  }
}
