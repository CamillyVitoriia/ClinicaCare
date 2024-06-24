import { Schema, model } from "mongoose";

export const Funcionario = model('Funcionario', new Schema({
  nome: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    required: true
  },
  horarioTrabalho: {
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
  }
}));
