import React from 'react';
import IngredientsSection from './ingredients-sections';
import marked from 'marked';

export default class Recipe extends React.Component {
  directionsHTML () {
    return { __html: marked(this.props.recipe.directions, {sanitize: true}) };
  }

  notesHTML () {
    return { __html: marked(this.props.recipe.notes, {sanitize: true}) };
  }

  render () {
    // Populate from flat array sections
    let sections = {};
    this.props.recipe.ingredients.forEach(ingredient => {
      let sectionName = ingredient.sectionName || "⚠";
      let section = sections[sectionName] || [];
      if (!sections[sectionName]) {
        sections[sectionName] = section;
      }
      section.push(ingredient);
    });

    let ingredientsSections = [];
    for (let sectionName in sections) {
      let section = sections[sectionName];
      ingredientsSections.push(
        <IngredientsSection 
          key={sectionName}
          name={sectionName}
          section={section}
        />
      );
    }

    return (
      <div className="recipe">
        <div className="title">
          <h1>{this.props.recipe.name}</h1>
        </div>
        <div className="ingredients">
          {ingredientsSections}
        </div>
        <div className="instructions">
          <h2>Directions:</h2> 
          <div
            dangerouslySetInnerHTML={this.directionsHTML()}
          />
        </div>
        <div className="meta">
          <div className="notes">
            <h2>Notes:</h2>
            <div
              dangerouslySetInnerHTML={this.notesHTML()}
            />
          </div>
          <div className="source">
            <h2>Source:</h2>
            {this.props.recipe.source}
          </div>
        </div>
      </div>
    );
  }
}
