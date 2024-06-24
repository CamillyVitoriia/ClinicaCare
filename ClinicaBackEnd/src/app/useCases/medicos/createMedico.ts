import { Request, Response } from "express";
import { Medico } from "../../models/Medico";

export async function createMedico(req: Request, res: Response) {
  try {
    const { nomeCompleto, especialidade, horarioAtendimento, email  } = req.body;

    // Verifica se já existe um Medico com o mesmo Email
    const existingMedicoEmail = await Medico.findOne({ email });

    if (existingMedicoEmail) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const medico = await Medico.create({
      nomeCompleto,
      especialidade,
      horarioAtendimento,
      email,
      senha: "12345678"
      });

    res.status(201).json(medico);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
