import { Request, Response } from "express";
import { Paciente } from "../../models/Paciente";
import mongoose from "mongoose";

export async function updatePaciente(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nomeCompleto, dataNascimento, genero, endereco, contato, historicoMedico, idConsulta } = req.body;

    console.log('ID ou CPF recebido:', id); // Verifica o valor recebido para id ou cpf

    let paciente;

    // Verifica se o parâmetro é um ObjectId válido (caso seja id) e faz a atualização por id
    if (mongoose.Types.ObjectId.isValid(id)) {
      paciente = await Paciente.findByIdAndUpdate(
        id,
        {
          nomeCompleto,
          dataNascimento,
          genero,
          endereco,
          contato,
          historicoMedico,
          idConsulta
        },
        { new: true, runValidators: true }
      );
    } else { // Caso contrário, faz a atualização por cpf
      paciente = await Paciente.findOneAndUpdate(
        { cpf: id },
        {
          nomeCompleto,
          dataNascimento,
          genero,
          endereco,
          contato,
          historicoMedico,
          idConsulta
        },
        { new: true, runValidators: true }
      );
    }

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    res.status(200).json(paciente);
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.sendStatus(500);
  }
}
