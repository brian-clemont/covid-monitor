import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { connect } from 'mongoose';
import patientRouter from '../routes/patients';
const app = express();
connect(
  'mongodb+srv://admin:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster-covid.gdywb.mongodb.net/patients-DB',
  { useUnifiedTopology: true, useNewUrlParser: true }
)
  .then(() => {
    console.log('Connected To MongoDB');
  })
  .catch((err) => {
    console.log('Connection Failed', err);
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  // app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
//   );
//   next();
// });



app.use('/api/patients', patientRouter);

export default app;
