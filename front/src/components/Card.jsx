import PropTypes from "prop-types";
import gryffindor from "../assets/houses/Gryffindor_ClearBG.webp";
import hufflepuff from "../assets/houses/Hufflepuff_ClearBG.webp";
import ravenclaw from "../assets/houses/RavenclawCrest.webp";
import slytherin from "../assets/houses/Slytherin_ClearBG.webp";

export default function Card({ student }) {
  const houseImage = () => {
    switch (student.house) {
      case "Gryffindor":
        return gryffindor;
      case "Slytherin":
        return slytherin;
      case "Hufflepuff":
        return hufflepuff;
      case "Ravenclaw":
        return ravenclaw;

      default:
        return "";
    }
  };

  const genderImage = () => {
    switch (student.gender) {
      case "male":
        return "https://icons.iconarchive.com/icons/custom-icon-design/flatastic-7/512/Male-icon.png";
      case "female":
        return "https://icons.iconarchive.com/icons/custom-icon-design/flatastic-7/512/Female-icon.png";
    }
  };

  return (
    <div className={`card ${student.gender}`}>
      <div className="card-child">
        <img src={genderImage()} alt="gender" width={20} />
        {student.name}
      </div>
      <div className="card-child">
        <img src={houseImage()} alt={student.house} width={30} />
        {student.house}
      </div>
      {student.alternate_names.length > 0 ? (
        <div>Alias: {student.alternate_names[0]}</div>
      ) : (
        ""
      )}
    </div>
  );
}

Card.propTypes = {
  student: PropTypes.element.isRequired,
};
