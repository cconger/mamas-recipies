package recipies

import (
	"encoding/json"
	"fmt"
	"github.com/zenazn/goji"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
	"net/http"
)

type Ingredient struct {
	Description string `json:"description"`
	Direction   string `json:"direction,omitempty"`
	Measurement string `json:"measurement,omitempty"`
	Quantity    string `json:"quantity,omitempty"`
	Section     string `json:"section,omitempty"`
}

type Recipe struct {
	Name        string       `json:"name"`
	Directions  string       `json:"directions"`
	Servings    int          `json:"servings"`
	Source      string       `json:"source"`
	Notes       string       `json:"notes"`
	Ingredients []Ingredient `json:"ingredients"`
}

func init() {
	http.Handle("/", goji.DefaultMux)
	goji.Get("/", handler)
	goji.Get("/api/pie", pie)
	goji.Get("/api/seed", seed)
}

func pie(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	q := datastore.NewQuery("Recipe")

	var recipies []Recipe
	if _, err := q.GetAll(ctx, &recipies); err != nil {
		log.Errorf(ctx, "Error querying for recipies %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(200)
	encoder := json.NewEncoder(w)
	encoder.Encode(recipies)
}

func seed(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	apples := Ingredient{
		Description: "Apples",
		Direction:   "Tart",
		Quantity:    "6-7",
	}

	ingredients := make([]Ingredient, 1)
	ingredients[0] = apples

	recipe := Recipe{
		Name:        "Apple Pie",
		Directions:  "1. Make it",
		Servings:    6,
		Source:      "Martha Edwards",
		Notes:       "Always a fav!",
		Ingredients: ingredients,
	}

	key, err := datastore.Put(ctx, datastore.NewIncompleteKey(ctx, "Recipe", nil), &recipe)
	if err != nil {
		log.Errorf(ctx, "Error storing recipe %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Stored pie to key labeled %q", key)
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, world")
}
