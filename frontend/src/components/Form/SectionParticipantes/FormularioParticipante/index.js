import React, {useState, useEffect} from 'react';
import {DeckEncoder} from 'runeterra';

import {useSaveState} from '../../../../context/SaveState';

import {Barra, Campo, Botoes, Botao} from './style';
import {MensagemErro} from '../../style';

import factions from '../../../../assets/factions.json';
import champions from '../../../../assets/champions.json';

function renderTime(time, index){
	return <option key={index} value={time.nome}>{time.nome}</option>;
}

const FormularioParticipante = ({titulo, mensagemClica, mostrar, setMostrar, jogadorAntigo}) => {

	const { saveState, setSaveState } = useSaveState();
	const { jogadores, times } = saveState;

	const [ jogador, setJogador ] = useState({nome: '',
		time: {nome: '', url_logo: ''},
		decks: [{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []},
				{code: '', regions: [], champions: []}]});
	const [ mensagemErro, setMensagemErro ] = useState();

	useEffect(() => {
		function carregaJogador(){
			if (mostrar){
				setJogador(jogadorAntigo);
			}
		}
		carregaJogador();
	}, [mostrar, jogadorAntigo]);

	function buscaTime(nome){
		return times.find((time) => time.nome === nome);
	}

	function buscaJogador(nome){
		return jogadores.find((jogador) => jogador.nome === nome);
	}

	function mudaTime(nome){
		const time = buscaTime(nome);
		if (time)	setJogador({...jogador, time});
		else		setJogador({...jogador, time: {nome: '', url_logo: ''}});
	}

	function mudaCodigoDeck(deck, index){
		const novo = [...jogador.decks];
		novo[index].code = deck;
		setJogador({...jogador, decks: novo});
	}

	function pegaRegioes(cards){
		let regions = [];
		cards.forEach((card) => {
			const region = card.faction.shortCode;
			if (!regions.includes(factions[region])){
				regions.push(factions[region]);
			}
		});
		return regions;
	}

	function pegaCampeoes(cards){
		let campeoes = [];
		cards.forEach((card) => {
			if (champions[card.code] !== undefined){
				campeoes.push({
					nome: champions[card.code],
					qtd: card.count
				});
			}
		});
		return campeoes;
	}
	
	function decodeDecks(decks){
		return decks.map(({code}) => {
			if (code === ''){
				return undefined;
			}

			let cards = [];

			try{
				cards = DeckEncoder.decode(code);
			}catch{
				return undefined;
			}

			return {code: code, regions: pegaRegioes(cards), champions: pegaCampeoes(cards)};
		});
	}

	function saveOrUpdateJogador(jogador){
		if (jogador.nome && (jogador.time.nome === '' || buscaTime(jogador.time.nome))){
			if (buscaJogador(jogador.nome)){
				setMensagemErro('Já existe um jogador com esse nome.');
				return;
			}

			const novosDecks = decodeDecks(jogador.decks);
			const valido = novosDecks.filter((deck) => deck === undefined).length === 0;

			if (valido){
				novosDecks.forEach((deck, index) => {
					const novo = [...jogador.decks];
					novo[index].code = deck.code;
					novo[index].regions = deck.regions;
					novo[index].champions = deck.champions;
					setJogador({...jogador, decks: novo});
				});
				
				if (mostrar){
					const novoJogadores = jogadores.map((j) => {
						if (j.nome === jogadorAntigo.nome){
							return jogador;
						}else{
							return j;
						}
					});
					setSaveState({...saveState, jogadores: novoJogadores});
				}else{
					setSaveState({...saveState, jogadores: [...jogadores, jogador]});
				}

				setJogador({nome: '',
					time: {nome: '', url_logo: ''},
					decks: [{code: '', regions: [], champions: []},
							{code: '', regions: [], champions: []},
							{code: '', regions: [], champions: []}]});
				setMensagemErro('');
				if (mostrar)	setMostrar(false);
			}else{
				setMensagemErro('Algum código de deck passado é inválido.');
			}
		}else{
			setMensagemErro("Nome ou time inválido.");
		}
	}
	
	return (
		<>
			<h3>{titulo}</h3>
			<Campo>
				<label htmlFor="time_jogador">Time:</label>
				<select name="time_jogador" value={jogador.time.nome}
						onChange={(e) => mudaTime(e.target.value)}>
					<option value="">Sem Time</option>
					{times.map(renderTime)}
				</select>
			</Campo>
			<Campo>
				<label htmlFor="nome_jogador">Nome:</label>
				<Barra type="text" name="nome_jogador" value={jogador.nome}
					   onChange={(e) => setJogador({...jogador, nome: e.target.value})}></Barra>
			</Campo>
			{jogador.decks.map(({code}, index) => {
				return <Campo key={index}>
					<label htmlFor={`deck${index+1}`}>Deck {index+1}:</label>
					<Barra type="text" name={`deck${index+1}`} value={code}
						   onChange={(e) => mudaCodigoDeck(e.target.value, index)}></Barra>
				</Campo>
			})}
			<MensagemErro>{mensagemErro}</MensagemErro>
			<Botoes>
				<Botao onClick={() => saveOrUpdateJogador(jogador)}>{mensagemClica}</Botao>
				{mostrar && <Botao onClick={() => setMostrar(false)}>Cancelar edição</Botao>}
			</Botoes>
		</>
	);
};

export default FormularioParticipante;