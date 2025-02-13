import React from "react";

import {
  RegionsChampions as RegionsChampionsDiv,
  Regions,
  Region,
  Champions,
  Champion,
} from "./style";

function renderRegion(region, index) {
  return (
    <Region className="region" key={index}>
      <img
        src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`}
        alt={region}
      />
    </Region>
  );
}

function renderChampion(champion, index, number_champions) {
  return (
    <Champion
      className="champion"
      key={index}
      lotado={number_champions > 4}
      img={`https://raw.githubusercontent.com/dneto/lor-tournament-analytics/master/apps/web/public/assets/imgs/champions/cropped/${champion.nome}-cropped.png`}
      alt={champion.nome}
    >
      {champion.qtd}
    </Champion>
  );
}

const RegionsChampions = ({ inline, time, regions, champions }) => {
  const number_champions = champions.length;

  return (
    <RegionsChampionsDiv
      className="regions-champions"
      inline={inline}
      time={time}
    >
      <Regions
        className="regions"
        inline={inline}
        time={time}
        nochampions={champions.length === 0}
      >
        {regions.map(renderRegion)}
      </Regions>
      {champions.length !== 0 && (
        <Champions className="champions" inline={inline} time={time}>
          {champions.map((item, index) =>
            renderChampion(item, index, number_champions)
          )}
        </Champions>
      )}
    </RegionsChampionsDiv>
  );
};

export default RegionsChampions;
