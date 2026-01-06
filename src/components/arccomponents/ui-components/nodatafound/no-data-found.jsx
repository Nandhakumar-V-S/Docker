// *******~ Import ~******** //
//? React

//? Assets
import { Player } from "@lottiefiles/react-lottie-player";
import DataNotFoundJson from "@/style/images/not-found.json";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const ArcDataNotFound = ({ Title }) => {
  return (
    <>
      <div className="arc-data-not-found">
        <div className="lottie-animation">
          <Player autoplay loop src={DataNotFoundJson}></Player>
        </div>
        <p className="not-found-text">
          {Title || "No Matches for the current filters."}
        </p>
      </div>
    </>
  );
};

export default ArcDataNotFound;
