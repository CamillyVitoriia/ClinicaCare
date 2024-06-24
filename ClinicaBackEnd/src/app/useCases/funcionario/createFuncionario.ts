import { Request, Response } from "express";
import { Funcionario } from "../../models/Funcionario";

export async function createFuncionario(req: Request, res: Response) {
  try {
    const { nome, cargo, horarioTrabalho, email  } = req.body;

    // Verifica se já existe um Funcionario com o mesmo Email
    const existingFuncionarioEmail = await Funcionario.findOne({ email });

    if (existingFuncionarioEmail) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const funcionario = await Funcionario.create({
      nome,
      cargo,
      horarioTrabalho,
      email,
      senha: "12345678"
      });

    res.status(201).json(funcionario);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
