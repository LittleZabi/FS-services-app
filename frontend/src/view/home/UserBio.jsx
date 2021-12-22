import { FaQuoteRight } from "react-icons/fa";
import userImage from "../assets/users/user1.jpg";
function UserBio() {
  return (
    <div className="bio-full-container">
      <div className="bio-container">
        <section className="section">
          <div className="section-image">
            <img src={userImage} alt="zohaib" />
            <span>
              <FaQuoteRight />
            </span>
          </div>
          <div className="bio-section-details">
            <span className="username">Muhammad Zohaib</span>
            <div className="div-line"></div>
            <span className="position">
              Electrical Engineer | Full Stock Web Developer
            </span>
            <span className="bio-text">
              A Professional Developer and Designer from South Battagram in
              Pakistan. I am allround Developer. I am a senior programmer with
              good knowledge of front-end techniques and back-end flows. I like
              automation in series of work. I love structure and order and i
              also stand for quality. I love spending time on fixing little
              details and optimizing web apps. Also I like working in a team,
              you'll learn faster and much more. As the saying goes: "two heads
              are better than one"
            </span>
            <div className="bio-location">
              <img src="./assets/fonts/map-marked-alt.svg" alt="" />
              <span>Joze, Battagram City, KP, Pakistan</span>
            </div>
          </div>
          <br />
        </section>
      </div>
    </div>
  );
}

export default UserBio;
