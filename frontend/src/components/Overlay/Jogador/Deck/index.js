import React from 'react';

import {Deck as DeckDiv, Champions, Champion} from './style';

function renderChampion(champion, index, status){
	return <Champion className={`champion ${status}`} key={index} img={`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion/${champion.nome}.png`}>{champion.qtd}</Champion>;
};

const Deck = ({status, champions}) => {
	return (
		<DeckDiv className="deck">
			{status !== undefined ?
				<Champions className={`champion ${status}`}>
					{champions.map((item, index) => renderChampion(item, index, status))}
				</Champions>
				:
				<Champions className="champion">
					{champions.map((item, index) => renderChampion(item, index, status))}
				</Champions>
			}
		</DeckDiv>
	)
};

export default Deck;
