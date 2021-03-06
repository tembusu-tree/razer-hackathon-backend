import App from './app';
import ClientsController from './clients/clients.controller';
import HealthCheckController from './healthcheck/healthcheck.controller';
import { LoansController } from './loans/loans.controller';

import 'dotenv/config';
import { PartnersController } from './partners/partners.controller';
// const mongoose = require('mongoose');

// const { MONGO_PATH } = process.env;
// mongoose.connect(`mongodb://${MONGO_PATH}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const app = new App([
  new HealthCheckController(),
  new ClientsController(),
  new LoansController(),
  new PartnersController(),
]);

app.listen();
