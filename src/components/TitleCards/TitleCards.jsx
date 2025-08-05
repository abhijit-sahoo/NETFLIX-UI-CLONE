import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const[apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  // console.log(category)

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGY4Y2QwNmJkYmIzMDZkZTAyMTM5MjQ0YzI0NTYyMiIsIm5iZiI6MTc1NDI3NDc4Mi4zNjMwMDAyLCJzdWIiOiI2ODkwMWJkZTU3ODc4MWFhZmZhNDY1MjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ls0np1ixl7AREg1Ob62RFuOEF47Y4zFNYu2_62f3tZY",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) =>{return res.json()})
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, []);

  // console.log(cardsRef)

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
