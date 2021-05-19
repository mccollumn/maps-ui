import { StarRounded } from "@material-ui/icons";

export const Ratings = ({ rating = 0 }) => {
  const starArray = [0, 1, 2, 3, 4];
  const Stars = starArray.map((idx) => {
    return <Star filled={rating > idx} key={`star-${idx}`} />;
  });
  return <div className="star-rating">{Stars}</div>;
};

const Star = ({ filled }) => {
  if (filled) {
    return <StarRounded style={{ color: "yellow", stroke: "black" }} />;
  }
  return <StarRounded style={{ color: "white", stroke: "black" }} />;
};
