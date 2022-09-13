import React from "react";

import { Deck as DeckDiv, Region, Champion } from "./style";

function renderRegion(region, index, status) {
  return (
    <Region className={`region ${status}`} key={index}>
      <img
        src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`}
        alt={region}
      />
    </Region>
  );
}

function renderChampion(champion, index, status) {
  return (
    <Champion
      className={`champion ${status}`}
      key={index}
      img={`https://raw.githubusercontent.com/dneto/lor-tournament-analytics/master/apps/web/public/assets/imgs/champions/cropped/${champion.nome}-cropped.png`}
    >
      {champion.qtd}
    </Champion>
  );
}

const Deck = ({ status, deck }) => {
  const { regions, champions } = deck;

  return (
    <DeckDiv className={`deck ${status}`}>
      {champions.length !== 0
        ? champions.map((item, index) => renderChampion(item, index, status))
        : regions.map((item, index) => renderRegion(item, index, status))}
    </DeckDiv>
  );
};

export default Deck;
