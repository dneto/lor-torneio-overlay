import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiExternalLink, FiCopy } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash, FaPencilAlt, FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

import { useSaveState } from "../../../context/SaveState";
import { useTime } from "../../../context/Time";

import { Section, SectionContent } from "../style";
import { Botoes, Botao, MensagemErro } from "./style";
import { findOne } from "../../../lib/backend";

const SectionServidor = ({ idServidor, setIdServidor, setDados }) => {
  const textRef = useRef(null);

  const { setSaveState } = useSaveState();
  const { time, setTime } = useTime();

  const [mostrarEditar, setMostrarEditar] = useState();
  const [mostrarIdServidor, setMostrarIdServidor] = useState();
  const [novoIdServidor, setNovoIdServidor] = useState();
  const [mensagemErro, setMensagemErro] = useState();

  function copiar(e) {
    textRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  function abrirFormulario() {
    setMostrarEditar(true);
  }

  async function validarId() {
    try {
      const response = await findOne(novoIdServidor);

      setDados(response, time, setIdServidor, setSaveState, setTime);
      setNovoIdServidor("");
      setMensagemErro("");
      setMostrarEditar(false);
    } catch (err) {
      setMensagemErro(err);
    }
  }

  function fecharFormulario() {
    setNovoIdServidor("");
    setMensagemErro("");
    setMostrarEditar(false);
  }

  return (
    <Section>
      <SectionContent className="form-inline">
        <div>
          <label htmlFor="id_servidor">ID da sessão:</label>
          <input
            type={mostrarIdServidor ? "text" : "password"}
            id="id_servidor"
            value={idServidor}
            ref={textRef}
            readOnly
          />
        </div>
        <Botoes>
          <Botao onClick={() => setMostrarIdServidor(!mostrarIdServidor)}>
            {mostrarIdServidor ? <FaRegEyeSlash /> : <FaRegEye />}
          </Botao>
          <Link to={`/${idServidor}`} target="_blank">
            <Botao>
              <FiExternalLink />
            </Botao>
          </Link>
          {mostrarIdServidor && (
            <Botao onClick={(e) => copiar(e)}>
              <FiCopy />
            </Botao>
          )}
          <Botao onClick={() => abrirFormulario()}>
            <FaPencilAlt />
          </Botao>
        </Botoes>
        {mostrarEditar && (
          <>
            <div>
              <label htmlFor="novo_id_servidor">Novo ID da sessão:</label>
              <input
                type="text"
                id="novo_id_servidor"
                value={novoIdServidor}
                onChange={(e) => setNovoIdServidor(e.target.value)}
              />
            </div>
            <Botao onClick={async () => await validarId()}>
              <FaCheck />
            </Botao>
            <Botao onClick={() => fecharFormulario()}>
              <RiCloseLine />
            </Botao>
            <MensagemErro>{mensagemErro}</MensagemErro>
          </>
        )}
      </SectionContent>
    </Section>
  );
};

export default SectionServidor;
