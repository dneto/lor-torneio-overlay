import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

import { useSaveState } from "../../../../context/SaveState";

import { Time, Deck, Regions, Region, Champions, Champion } from "./style";

function renderTime(time, index) {
  return (
    <Time key={index}>
      <img className="logo" src={time.url_logo} alt={time.nome} />
      <span>{time.nome}</span>
    </Time>
  );
}

function renderRegion(region, index) {
  return (
    <Region key={index}>
      <img
        src={`http://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${region}.png`}
        alt={region}
      />
    </Region>
  );
}

function renderChampion(champion, index) {
  return (
    <Champion
      key={index}
      img={`https://raw.githubusercontent.com/dneto/lor-tournament-analytics/master/apps/web/public/assets/imgs/champions/cropped/${champion.nome}-cropped.png`}
    >
      {champion.qtd}
    </Champion>
  );
}

function renderDeck(deck) {
  return (
    <Deck>
      <Regions>{deck.regions.map(renderRegion)}</Regions>
      <Champions>{deck.champions.map(renderChampion)}</Champions>
    </Deck>
  );
}

const TabelaParticipantes = ({ jogadorQuery, apresentaFormulario }) => {
  const { saveState, setSaveState } = useSaveState();
  const { jogadores } = saveState;

  function deletaParticipante(nome) {
    const novo = jogadores.filter((jogador) => jogador.nome !== nome);
    setSaveState({ ...saveState, jogadores: novo });
  }

  const colunasParticipantes = [
    {
      name: "Excluir",
      selector: "excluir",
      sortable: false,
      cell: (row) => (
        <button
          className="botao-excluir"
          onClick={() => deletaParticipante(row.nome)}
        >
          <FaTrash />
        </button>
      ),
      center: true,
    },
    {
      name: "Editar",
      selector: "editar",
      sortable: false,
      cell: (row) => (
        <button
          className="botao-editar"
          onClick={() => apresentaFormulario(row.nome)}
        >
          <FaPencilAlt />
        </button>
      ),
      center: true,
    },
    {
      name: "Time",
      selector: "time",
      sortable: true,
      cell: (row) => renderTime(row.time),
      right: true,
    },
    {
      name: "Nome",
      selector: "nome",
      sortable: true,
    },
    {
      name: "Deck 1",
      selector: "deck1",
      sortable: false,
      cell: (row) => renderDeck(row.decks[0]),
      center: true,
    },
    {
      name: "Deck 2",
      selector: "deck2",
      sortable: false,
      cell: (row) => renderDeck(row.decks[1]),
      center: true,
    },
    {
      name: "Deck 3",
      selector: "deck3",
      sortable: false,
      cell: (row) => renderDeck(row.decks[2]),
      center: true,
    },
  ];

  const jogadoresVisiveis = useMemo(
    () =>
      jogadores.filter((jogador) =>
        jogador.nome.toLowerCase().includes(jogadorQuery.toLowerCase())
      ),
    [jogadores, jogadorQuery]
  );

  return (
    <DataTable
      noHeader
      pagination
      paginationPerPage={12}
      paginationRowsPerPageOptions={[12, 24, 36]}
      defaultSortField="nome"
      columns={colunasParticipantes}
      data={jogadoresVisiveis}
      noDataComponent="Não há participantes neste torneio."
    />
  );
};

export default TabelaParticipantes;
