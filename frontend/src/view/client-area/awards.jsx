export default function Awards({ category }) {
  return (
    <span className="bal-msg">
      {category === "bronze" ? (
        <>
          <i className="fas fa-award bronze"></i>
        </>
      ) : category === "silver" ? (
        <>
          <i className="fas fa-award silver"></i>
          <i className="fas fa-award silver"></i>
        </>
      ) : category === "platinum" ? (
        <>
          <i className="fas fa-award platinum"></i>
          <i className="fas fa-award platinum"></i>
          <i className="fas fa-award platinum"></i>
        </>
      ) : category === "diamond" ? (
        <>
          <i className="fas fa-award diamond"></i>
          <i className="fas fa-award diamond"></i>
          <i className="fas fa-award diamond"></i>
          <i className="fas fa-award diamond"></i>
        </>
      ) : category === "gold" ? (
        <>
          <i className="fas fa-award gold"></i>
          <i className="fas fa-award gold"></i>
          <i className="fas fa-award gold"></i>
          <i className="fas fa-award gold"></i>
          <i className="fas fa-award gold"></i>
        </>
      ) : (
        <>
          <i className="fas fa-award bronze"></i>
        </>
      )}
      <br />
    </span>
  );
}
