import React from "react";
import Banner from "./Banner";
import ReadingStates from "./ReadingStates";
import BookClub from "./BookClub";

const Home = () => {
  return (
    <div>
      <Banner />
      <ReadingStates />
      <BookClub />
      {/* <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div> */}
    </div>
  );
};

export default Home;
