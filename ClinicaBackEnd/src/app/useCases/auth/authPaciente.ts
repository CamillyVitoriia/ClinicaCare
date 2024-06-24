import { Request, Response } from "express";
import { Paciente } from "../../models/Paciente";

export async function authPaciente(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const paciente = await Paciente.findOne({ email });
    if (!paciente || paciente.senha !== senha) {
      return res.status(400).json({ error: 'Email ou senha inválidos' });
    }

    res.json({ message: 'Login bem sucedido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}
