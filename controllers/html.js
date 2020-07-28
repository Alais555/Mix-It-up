/* eslint-disable prettier/prettier */
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });
  app.get("/mix", (req, res) => {
    // get all the ingredients
    db.Ingredient.findAll()
      .then(ingredients => {
        const sours = [];
        const alcohols = [];
        const sweeteners = [];
        const others = [];
        // then sort ingredients to an array by the category
        ingredients.forEach(ingredient => {
          const name =
            ingredient.name[0].toUpperCase() + ingredient.name.substr(1);
          const value = ingredient.name;
          //"alcohol", "sour", "sweetener", "other"
          if (ingredient.category === "alcohol") {
            alcohols.push({ name, value });
          } else if (ingredient.category === "sweetener") {
            sweeteners.push({ name, value });
          } else if (ingredient.category === "sour") {
            sours.push({ name, value });
          } else {
            sours.push({ name, value });
          }
        });
        // render mis with each of the arrays
        res.render("mix", { alcohols, sours, sweeteners, others });
      })
      .catch(error => {
        console.log(error);
        res.status(500).end();
      });
  });

  app.get("/cocktails", (req, res) => {
    let cocktailsPromise;
    if (!req.query.ingredients) {
      cocktailsPromise = db.Cocktail.findAll({
        include: db.Ingredient
      }).then(cocktails => cocktails.map(c => c.toJSON()));
    } else {
      cocktailsPromise = db.Cocktail.findAllContainingEveryIngredient(
        req.query.ingredients.split(",")
      );
    }
    console.log(cocktailsPromise);

    cocktailsPromise
      .then(cocktails => { 
        const drinks = [{
          name: "Tequila Surprise",
          imageUrl: "https://www.acouplecooks.com/wp-content/uploads/2020/03/Margarita-025.jpg",
          ingredients: ["Lipsmackingly sweet-and-sour", 
            "the Cosmopolitan cocktail of vodka", 
            "cranberry",
            "orange liqueur", 
            "citrus"],
          recipe: [ "Measure/Jigger Egg cup.",
            "Cocktail shaker Thermos flask.",
            "Muddler Small rolling pin/End of a wooden spoon.",
            "Juicer Squeeze by hand.",
            "Mixing spoon Long teaspoon/Fork handle.",
            "Strainer Tea strainer."]


        }];
        console.log("looook here for cocktails", cocktails);
        res.render("cocktails", { cocktails: drinks });
      })
      .catch(error => {
        console.log(error);
        res.status(500).end();
      });
  });
  app.get("/cocktails/:id", (req, res) => {
    db.Cocktail.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Ingredient]
    }).then(dbDrink => {
      // res.json(dbDrink);
      res.render("cocktails-view-page", dbDrink.toJSON());
    });
  });
};
