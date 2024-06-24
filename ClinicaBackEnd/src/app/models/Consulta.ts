import { Schema, model } from "mongoose";

export const Consulta = model('Consulta', new Schema({
  dataHora: {
    type: Date,
    required: true
  },
  diagnostico: {
    type: String
  },
  tratamento: [{
    type: String
  }],
  exames: [{
    type: String
  }],
  idMedico: {
    type: Schema.Types.ObjectId,
    ref: 'Medico',
  },
  especialidade: {
    type: String,
    required: true
  },
  cpfPaciente: {
    type: String,
  },
  idPaciente: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente',
  }
}));
