import React from "react";

import './landingPage.scss'

function HeroCard(props) {
  const { heroCardContent } = props;
  const { link, title, description, listItems } = heroCardContent;


  return (
    <div className="col-12 col-lg-6">
      <a href={link}>
        <div className="shadow p-3 m-5 rounded hero-card">
          <h2>{title}</h2>
          <h6>{description}</h6>
          <ul>
            {listItems.map((listItem, index) => {
              return (
                <li key={index}>{listItem}</li>
              )
            })}
          </ul>
        </div>
      </a>
    </div>
  )
};

export default HeroCard;