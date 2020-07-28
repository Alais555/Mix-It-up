module.exports = sequelize => {
  const CocktailIngredient = sequelize.define("CocktailIngredient");
  return CocktailIngredient;
};
