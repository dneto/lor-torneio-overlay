import React, { useEffect, useState } from 'react';
import {ThemeProvider} from 'styled-components';
import axios from 'axios';

import {useSaveState} from '../../context/SaveState';
import {useTime} from '../../context/Time';

import Overlay from '../../components/Overlay';

const theme = {
	webcamSize: 20
};

const Visual = (props) => {
	const [ idServidor, setIdServidor ] = useState('');
	const { setSaveState } = useSaveState();
	const { time, setTime } = useTime();
	
	function setDados(dados){
		setIdServidor(dados._id);
		setSaveState({
			webcam: dados.webcam,
			cronometro: dados.cronometro,
			nomeTorneio: dados.nomeTorneio,
			faseTorneio: dados.faseTorneio,
			tempoLimiteTorneio: dados.tempoLimiteTorneio,
			jogador1: dados.jogador1,
			jogador2: dados.jogador2,
			bans: [dados.bans1, dados.bans2],
			vitorias: [dados.vitorias1, dados.vitorias2],
			atuais: [dados.atuais1, dados.atuais2],
			jogadores: dados.jogadores,
			times: dados.times
		});
		setTime({...time, tempo: dados.tempo});
	}

	async function carregaDadosDoBanco(id){
		try{
			const response = await axios({
				method: 'get',
				url: `https://lor-torneio-overlay.herokuapp.com/${id}`
			});

			if (response.status === 200){
				setDados(response.data);
				return true;
			}else{
				return false;
			}
		}
		catch(err)
		{
			console.log(err);
			return false;
		}
	}

	useEffect(() => {
		const carregaDados = async () => {
			carregaDadosDoBanco(props.match.params.id);
		};
		setInterval(() => {
			carregaDados();
		}, 1000);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="content">
			<ThemeProvider theme={theme}>
				{ idServidor && <Overlay className="overlay"/>}
			</ThemeProvider>
		</div>
	)
}

export default Visual;