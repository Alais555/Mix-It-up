const db = require("../models");

populateDb()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

async function populateDb() {
  await db.CocktailIngredient.drop();
  await db.Cocktail.drop();
  await db.Ingredient.drop();
  await db.sequelize.sync();
  const ingredients = await db.Ingredient.bulkCreate([
    { name: "tequila", category: "alcohol" },
    { name: "orange juice", category: "sweetener" },
    { name: "grenadine", category: "sweetener" },
    { name: "gin", category: "alcohol" },
    { name: "vermouth", category: "other" },
    { name: "olive", category: "other" },
    { name: "tomato juice", category: "other" },
    { name: "lemon juice", category: "sour" },
    { name: "tobasco sauce", category: "other" },
    { name: "celery salt", category: "other" },
    { name: "lemon slice", category: "other" }
  ]);

  const cocktails = await db.Cocktail.bulkCreate([
    {
      name: "Tequila Sunrise",
      recipe:
        "Pour the tequila and orange juice into glass over ice. Add the grenadine, which will sink to the bottom. Do not stir. Garnish and serve.",
      imageUrl:
        "https://www.acouplecooks.com/wp-content/uploads/2020/04/Tequila-Sunrise-003s.jpg"
    },
    {
      name: "Martini",
      recipe: `1 Fill a mixing glass with ice cubes: Combine the gin and vermouth, pouring more or less vermouth to your taste.
      2 Stir for 30 seconds: Then strain into a chilled cocktail glass.
      3 Add a dash of bitters, if desired.
      4 Garnish: with a lemon twist, or add olives to make a dirty martini. 
      `,
      imageUrl:
        "https://makemeacocktail.com/images/cocktails/7376/400_267_martini.jpg"
    },
    {
      name: "Bloody Maria",
      recipe: `Shake all ingredients (except lemon slice) with cracked ice and strain into an old-fashioned glass over ice cubes.
      Add the slice of lemon and serve.`,
      imageUrl:
        "https://www.thecocktaildb.com/images/media/drink/yz0j6z1504389461.jpg"
    }
  ]);

  await db.CocktailIngredient.bulkCreate([
    { CocktailId: 1, IngredientId: 1 },
    { CocktailId: 1, IngredientId: 2 },
    { CocktailId: 1, IngredientId: 3 },
    { CocktailId: 2, IngredientId: 4 },
    { CocktailId: 2, IngredientId: 5 },
    { CocktailId: 2, IngredientId: 6 },
    { CocktailId: 3, IngredientId: 1 },
    { CocktailId: 3, IngredientId: 7 },
    { CocktailId: 3, IngredientId: 8 },
    { CocktailId: 3, IngredientId: 9 },
    { CocktailId: 3, IngredientId: 10 },
    { CocktailId: 3, IngredientId: 11 }
  ]);

  console.log(
    `Added ${ingredients.length} ingredients and ${cocktails.length} cocktails`
  );
}
