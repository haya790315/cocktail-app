import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
// import { useGlobalContext } from "../context";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  // const {cocktails,loading} = useGlobalContext();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);
  const params = useParams();
  useEffect(() => {
    setLoading(true);
    async function gotCocktail() {
      try {
        const response = await fetch(`${url}${params.page}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instruction,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
          ];
          const newDrink = {
            name,
            image,
            info,
            category,
            glass,
            instruction,
            ingredients,
          };
          setCocktail(newDrink);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
    gotCocktail();
  }, [params.page]);
  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="title">no cocktail</h2>;
  }
  const { name, image, info, category, glass, instruction, ingredients } =
    cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instruction:</span>
            {instruction}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {ingredients.map((ing, index) => {
              return ing ? <span key={index}>{ing}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
