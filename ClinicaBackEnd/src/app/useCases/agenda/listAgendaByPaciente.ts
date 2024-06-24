import { Request, Response } from "express";
import { Consulta } from "../../models/Consulta";

export async function getAgendaPaciente(req: Request, res: Response) {
  try {
    const { cpfPaciente } = req.params;

    const consultas = await Consulta.find({ cpfPaciente }).exec();

    if (!consultas || consultas.length === 0) {
      return res.status(404).json({ message: 'Agenda do paciente não encontrada ou vazia' });
    }

    res.status(200).json(consultas);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
