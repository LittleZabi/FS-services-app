export default function Stars({ stars, category, classes }) {
  return (
    <span className={classes}>
      <i className={stars >= 1 ? "fa fa-star open" : "fa fa-star"}></i>
      <i className={stars >= 2 ? "fa fa-star open" : "fa fa-star"}></i>
      <i className={stars >= 3 ? "fa fa-star open" : "fa fa-star"}></i>
      <i className={stars >= 4 ? "fa fa-star open" : "fa fa-star"}></i>
      <i className={stars >= 5 ? "fa fa-star open" : "fa fa-star"}></i>

      <span className="stars-info">
        Rating {stars} star{" "}
        <strong style={{ textTransform: "capitalize" }}>{category}</strong>
      </span>
    </span>
  );
}
