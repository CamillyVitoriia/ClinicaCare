import { Request, Response } from "express";
import { Medico } from "../../models/Medico";

export async function authMedico(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const medico = await Medico.findOne({ email });
    if (!medico || medico.senha !== senha) {
      return res.status(400).json({ error: 'Email ou senha inválidos' });
    }

    res.json({ message: 'Login bem sucedido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}
