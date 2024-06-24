import { Request, Response } from "express";
import { Funcionario } from "../../models/Funcionario";

export async function authFuncionario(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const funcionario = await Funcionario.findOne({ email });
    if (!funcionario || funcionario.senha !== senha) {
      return res.status(400).json({ error: 'Email ou senha inválidos' });
    }

    res.json({ message: 'Login bem sucedido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}
