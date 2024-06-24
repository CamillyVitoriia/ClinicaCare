import { Schema, model } from "mongoose";

const estadosBrasil = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const enderecoSchema = new Schema({
  rua: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  complemento: {
    type: String,
    required: true
  },
  bairro: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: estadosBrasil,
    required: true
  },
  cep: {
    type: String,
    required: true
  }
});

const historicoMedicoSchema = new Schema({
  problema: {
    type: String,
    required: true
  },
  medicamento: {
    type: String,
    required: true
  },
  // data: {
  //   type: Date,
  //   required: true
  // },
  // medico: {
  //   type: String,
  //   required: true
  // }
});

export const Paciente = model('Paciente', new Schema({
  nomeCompleto: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro'],
    default: 'Outro',
    required: true
  },
  endereco: enderecoSchema,
  contato: {
    type: String,
    required: true
  },
  cpf: {
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
  historicoMedico: [historicoMedicoSchema],
  idConsulta: [{
    type: Schema.Types.ObjectId,
    ref: 'Consulta'
  }]

}));

