import { Schema, model } from "mongoose";

export const Medico = model('Medico', new Schema({
  nomeCompleto: {
    type: String,
    required: true
  },
  especialidade: {
    type: String,
    required: true
  },
  horarioAtendimento: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  idConsulta: [{
    type: Schema.Types.ObjectId,
    ref: 'Consulta'
  }]
}));
