import React from 'react';

export default class RecipeSettings extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      menuOpen: false
    };
  }

  toggleMenu () {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  editRecipe () {
    let route = Application.router.getActiveRoute();
    route.send('edit');
    this.toggleMenu();
  }

  render () {
    let menuClasses = ['menu'];
    if (this.state.menuOpen) {
      menuClasses.push('shown');
    }

    return (
      <div className="recipeSettings">
        <div className="label" onClick={this.toggleMenu.bind(this)}>
        </div>
        <ul className={menuClasses.join(' ')}>
          <li onClick={this.editRecipe.bind(this)}>Edit</li>
          <li>Delete</li>
          <li>Duplicate</li>
        </ul>
      </div>
    );
  }
}
