import { Request, Response } from 'express';
import { Consulta } from '../../models/Consulta'; // Importe seu modelo de Consulta aqui

export async function deleteConsulta(req: Request, res: Response) {
    try {
        const { cpfPaciente, consultaId } = req.params;

        console.log('Deletando consulta:', { cpfPaciente, consultaId })

        const deletedConsulta = await Consulta.findOneAndDelete({ _id: consultaId, cpfPaciente });

        if (!deletedConsulta) {
            return res.status(404).json({ message: 'Consulta não encontrada para o paciente especificado.' });
        }

        return res.status(200).json({ message: 'Consulta deletada com sucesso.', consulta: deletedConsulta });
    } catch (error) {
        console.error('Erro ao deletar consulta:', error);
        return res.status(500).json({ message: 'Erro ao deletar consulta.', error });
    }
}
