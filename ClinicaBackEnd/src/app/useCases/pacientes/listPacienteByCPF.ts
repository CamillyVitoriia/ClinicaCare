import { Request, Response } from "express";
import { Paciente } from '../../models/Paciente';

export async function listPacienteByCPF(req: Request, res: Response) {
    try {
        const { cpf } = req.params;

        const paciente = await Paciente.findOne({ cpf });

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        res.status(200).json(paciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao consultar paciente' });
    }
}
