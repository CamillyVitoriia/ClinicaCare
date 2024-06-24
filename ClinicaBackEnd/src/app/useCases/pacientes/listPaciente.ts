import { Request, Response } from "express";
import { Paciente } from "../../models/Paciente";

export async function listPaciente(req: Request, res: Response){
  try {
    const pacientes = await Paciente.find()
    .sort({ createdAt: 1 })
    .populate('idConsulta');

    res.json(pacientes);
    console.log(pacientes)
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
