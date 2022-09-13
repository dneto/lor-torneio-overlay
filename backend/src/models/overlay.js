import mongoose from "mongoose";

export const Time = mongoose.Schema(
  {
    nome: String,
    url_logo: String,
  },
  { _id: false }
);

export const Champion = mongoose.Schema(
  {
    nome: String,
    qtd: Number,
  },
  { _id: false }
);

export const Deck = mongoose.Schema(
  {
    code: String,
    regions: [String],
    champions: [Champion],
  },
  { _id: false }
);

export const Jogador = mongoose.Schema(
  {
    nome: String,
    time: Time,
    decks: [Deck],
  },
  { _id: false }
);

const Overlay = mongoose.model(
  "overlay",
  mongoose.Schema(
    {
      webcam: Boolean,
      cronometro: Boolean,
      nomeTorneio: String,
      faseTorneio: String,
      tempo: Number,
      tempoLimiteTorneio: Number,
      jogador1: Jogador,
      jogador2: Jogador,
      jogadores: [Jogador],
      times: [Time],
      atuais1: [Boolean],
      bans1: [Boolean],
      vitorias1: [Boolean],
      atuais2: [Boolean],
      bans2: [Boolean],
      vitorias2: [Boolean],
    },
    { timestamps: true }
  )
);

export default Overlay;
