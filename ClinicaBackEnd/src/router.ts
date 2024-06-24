import { Router } from 'express';
import { createPaciente } from './app/useCases/pacientes/createPaciente';
import { updatePaciente } from './app/useCases/pacientes/updatePacienteById';
import { getAgenda } from './app/useCases/agenda/listAgendaByMedico';
import { createMedico } from './app/useCases/medicos/createMedico';
import { updateMedico } from './app/useCases/medicos/updateMedico';
import { listPaciente } from './app/useCases/pacientes/listPaciente';
import { authPaciente } from './app/useCases/auth/authPaciente';
import { authMedico } from './app/useCases/auth/authMedico';
import { authFuncionario } from './app/useCases/auth/authFuncionario';
import { createFuncionario } from './app/useCases/funcionario/createFuncionario';
import { listPacienteByCPF } from './app/useCases/pacientes/listPacienteByCPF';
import { getAgendaPaciente } from './app/useCases/agenda/listAgendaByPaciente';
import { createConsulta } from './app/useCases/consultas/createConsulta';
import { deleteConsulta } from './app/useCases/consultas/deleteConsulta';

export const router = Router();

// Paciente
router.get('/api/v1/paciente', listPaciente);
router.get('/api/v1/paciente/:cpf', listPacienteByCPF);
router.post('/api/v1/paciente', createPaciente);
router.put('/api/v1/paciente/:id', updatePaciente);

// Medico
router.post('/api/v1/medico', createMedico);
router.put('/api/v1/medico/:idMedico', updateMedico);


// Funcionario
router.post('/api/v1/fucionario', createFuncionario);

// Consulta
router.get('/api/v1/consulta', getAgenda);
router.post('/api/v1/consulta', createConsulta);
router.delete('/api/v1/consulta/:cpfPaciente/:consultaId', deleteConsulta);


// Agenda
router.get('/api/v1/medico/:idMedico/agenda', getAgenda);
router.get('/api/v1/paciente/:cpfPaciente/agenda', getAgendaPaciente);

// Auth
router.post('/api/v1/auth/paciente', authPaciente);
router.post('/api/v1/auth/funcionario', authFuncionario);
router.post('/api/v1/auth/medico', authMedico);

