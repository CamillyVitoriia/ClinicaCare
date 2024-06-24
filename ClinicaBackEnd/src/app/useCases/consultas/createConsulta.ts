import { Request, Response } from "express";
import { Consulta } from "../../models/Consulta";

export async function createConsulta(req: Request, res: Response) {
  try {
    const { dataHora, especialidade, cpfPaciente } = req.body;

    // Formatar dataHora corretamente
    const formattedDate = new Date(dataHora);

    const consulta = await Consulta.create({
      dataHora: formattedDate,
      especialidade,
      cpfPaciente
    });

    res.status(201).json(consulta);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
