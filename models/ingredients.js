module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category: {
      type: DataTypes.ENUM("alcohol", "sour", "sweetener", "other")
    }
  });

  Ingredient.associate = models => {
    Ingredient.belongsToMany(models.Cocktail, {
      through: "CocktailIngredient"
    });
  };
  return Ingredient;
};
