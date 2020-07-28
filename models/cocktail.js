module.exports = (sequelize, DataTypes) => {
  const Cocktail = sequelize.define("Cocktail", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    recipe: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  });

  Cocktail.associate = models => {
    Cocktail.belongsToMany(models.Ingredient, {
      through: "CocktailIngredient"
    });
  };

  // Define custom static method on the Cocktail model to find all cocktails
  // which contain every ingredient in ingredients parameter. Ingredients param.
  // must be an array of strings containing the names of the ingredients.
  Cocktail.findAllContainingEveryIngredient = async function(ingredients) {
    const sqlString = `
      SELECT c.id, c.name, c.recipe, c.imageUrl
        FROM cocktails c
        JOIN cocktailingredients ci ON ci.CocktailId = c.id
        JOIN ingredients i ON i.id = ci.IngredientId
      WHERE i.name IN (:ingredients)
      GROUP BY c.id
      HAVING COUNT(DISTINCT i.name) = :count`;

    const replacements = { ingredients, count: ingredients.length };

    return sequelize
      .query(sqlString, {
        type: sequelize.QueryTypes.SELECT,
        replacements,
        model: Cocktail
      })
      .then(toJSONwithIngredients);
  };

  return Cocktail;
};

// Accepts array of cocktail model instances and returns them as plain
// objects after async. loading ingredients for each cocktail instance.
function toJSONwithIngredients(cocktails) {
  return Promise.all(
    cocktails.map(async c => {
      const ingredients = await c.getIngredients();
      return {
        ...c.toJSON(),
        Ingredients: ingredients.map(i => i.toJSON())
      };
    })
  );
}
