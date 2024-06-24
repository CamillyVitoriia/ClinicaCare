import { Request, Response } from "express";
import { Consulta } from "../../models/Consulta";

export async function getAgenda(req: Request, res: Response) {
  try {
    const { idMedico } = req.params;

    const consultas = await Consulta.find({ idMedico }).populate('idPaciente', 'nomeCompleto').exec();

    if (!consultas || consultas.length === 0) {
      return res.status(404).json({ message: 'Agenda do médico não encontrada ou vazia' });
    }

    res.status(200).json(consultas);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
