import React from 'react';

export default class EditableRecipe extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      title: props.recipe.name,
      directions: props.recipe.directions,
      notes: props.recipe.notes,
      source: props.recipe.source
    };
  }

  updateField (field, event) {
    console.log(field, event);
    let newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }

  save (event) {
    let route = Application.router.getActiveRoute();
    route.send('saveEdit', this.state);
  }

  cancel (event) {
    let route = Application.router.getActiveRoute();
    route.send('cancelEdit');
  }

  render () {
    return (
      <div className="recipe editing">
        <div className="controls">
          <div className="button" onClick={this.save.bind(this)}>
            Save
          </div>
          <div className="button cancel" onClick={this.cancel.bind(this)}>
            Cancel
          </div>
        </div>
        <div className="title">
          <input
            type="text"
            value={this.state.title}
            onChange={this.updateField.bind(this, 'title')}
          />
        </div>
        <div className="instructions">
          <h2>Directions:</h2> 
          <textarea
            value={this.state.directions}
            onChange={this.updateField.bind(this, 'directions')}
          />
        </div>
        <div className="meta">
          <div className="notes">
            <h2>Notes:</h2>
            <textarea
              value={this.state.notes}
              onChange={this.updateField.bind(this, 'notes')}
            />
          </div>
          <div className="source">
            <h2>Source:</h2>
            <input
              type="text"
              value={this.state.source}
              onChange={this.updateField.bind(this, 'source')}
            />
          </div>
        </div>
      </div>
    );
  }
}
