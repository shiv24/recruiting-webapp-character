import { React, useState } from "react";
import "./ClassInfo.css";

function ClassInfo(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      {props.classList.includes(props.val) ? (
        <h1 className="highlight" onClick={handleClick}>
          {props.val}
        </h1>
      ) : (
        <h1 onClick={handleClick}>{props.val}</h1>
      )}

      {isClicked &&
        Object.keys(props.items[props.val]).map((item) => {
          return (
            <div>
              <ul>
                {item}:{props.items[props.val][item]}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default ClassInfo;
