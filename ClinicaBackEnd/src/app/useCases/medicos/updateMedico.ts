import { Request, Response } from "express";
import { Medico } from "../../models/Medico";

export async function updateMedico(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nomeCompleto, especialidade, horarioAtendimento } = req.body;

    const medico = await Medico.findByIdAndUpdate(
      id,
      {
        nomeCompleto,
        especialidade,
        horarioAtendimento
      },
      { new: true, runValidators: true }
    );

    if (!medico) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    res.status(200).json(medico);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
