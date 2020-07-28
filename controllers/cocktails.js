module.exports = function(app) {
  app.get("/api/cocktails", (req, res) => {
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
    cocktailsPromise
      .then(cocktails => {
        res.json(cocktails);
      })
      .catch(error => {
        console.log(error);
        res.status(500).end();
      });
  });
};
