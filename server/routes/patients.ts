import { Router } from 'express';
import { addPatient,getPatients , deletePatient, updatePatient, getSelectedPatient} from '../controllers/patients';

let patientRouter = Router();

// router.get('',getPatients)
patientRouter.post('', addPatient);
patientRouter.get('', getPatients);
patientRouter.delete('/:id', deletePatient);
patientRouter.put('/:id', updatePatient);
patientRouter.get('/:id', getSelectedPatient);


export default patientRouter;
