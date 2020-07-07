import Patient from '../models/patient';

export let addPatient = (req, res, next) => {

  let patient = new Patient({
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
    familyCount: req.body.familyCount,
    phone: req.body.phone,
    status: req.body.status,
  });

  patient
    .save()
    .then((createdPatient) => {
      console.log('createdPatient', createdPatient);
      res.status(201).json({
        message: 'Patient Added Successfully',
        patient: createdPatient,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Adding A Patient Failed', error: error });
    });
};

export let getPatients = (req, res, next) => {
  let patientQuery = Patient.find();

  patientQuery
    .then((documents) => {
      res.status(200).json({
        message: 'Patient data fetched successfully',
        patients: documents,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Fetching Patients Failed', error: error });
    });
};

export let getSelectedPatient = (req, res, next) => {
  Patient.findById(req.params.id)
    .then((patient) => {
      if (patient) {
        res.status(200).json(patient);
      } else {
        res.status(404).json({ message: 'Patient not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't Fetch Patient",
      });
    });
};

export let updatePatient = (req, res, next) => {

  let patient = new Patient({
    _id: req.params.id,
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
    familyCount: req.body.familyCount,
    phone: req.body.phone,
    status: req.body.status,
  });

  Patient.updateOne({ _id: req.params.id }, patient)
    .then((updatedPatient) => {
      if (updatedPatient.n > 0) {
        res.status(200).json({
          message: 'Update Successful!',
        });
      } else {
        res.status(401).json({
          message: 'Not Authorized',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't Update Patient",
        error: error,
      });
    });
};

export let deletePatient = (req, res, next) => {
  Patient.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: 'Deleted Successful!',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't Delete Post",
      });
    });
};
