import ReactMarkdown from "react-markdown";

export default function AIChefRecipe(props) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Your Culinary Wish is My Command:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
