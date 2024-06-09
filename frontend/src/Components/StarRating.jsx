import React, {useState} from 'react'
import { FaStar } from "react-icons/fa";

function StarRating() {
    const [hoverStar, setHoverStar] = useState(0);
    const [clickStar, setClickStar] = useState(0);

  return (
    <div>
         <div style={{ display: "flex", gap: "5px", fontSize: "22px", marginBottom:"5px" }}>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    index + 1 <= (clickStar || hoverStar) ? "star" : ""
                  }`}
                  onClick={() => {
                    setClickStar(index + 1);
                  }}
                  onMouseEnter={() => {
                    setHoverStar(index + 1);
                  }}
                  onMouseLeave={() => {
                    setHoverStar(0);
                  }}
                />
              ))}
            </div>
    </div>
  )
}

export default StarRating
