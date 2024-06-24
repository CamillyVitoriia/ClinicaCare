import { Request, Response } from "express";
import { Paciente } from "../../models/Paciente";

export async function createPaciente(req: Request, res: Response) {
  try {
    const { nomeCompleto, dataNascimento, genero, endereco, contato, cpf, email } = req.body;

    // Verifica se todos os dados foram preenchidos
    if (!nomeCompleto || !dataNascimento || !genero || !endereco || !contato || !cpf || !email) {
      return res.status(400).json({ message: "Todos os campos devem ser preenchidos" });
    }

    // Verifica se já existe um paciente com o mesmo CPF
    const existingPaciente = await Paciente.findOne({ cpf });

    // Verifica se já existe um paciente com o mesmo Email
    const existingPacienteEmail = await Paciente.findOne({ email });

    if (existingPaciente) {
      return res.status(400).json({ message: "CPF já cadastrado" });
    }

    if (existingPacienteEmail) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Gera a senha do paciente (data de nascimento sem caracteres adicionais)
    const senha = dataNascimento.replace(/[-/]/g, ""); // Remove traços ou barras

    const paciente = await Paciente.create({
      nomeCompleto,
      dataNascimento,
      genero,
      endereco,
      contato,
      cpf,
      email,
      senha
    });

    res.status(201).json(paciente);

    console.log(paciente)

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
