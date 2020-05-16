import express from 'express';

import * as bodyParser from 'body-parser';
import { checkToken } from './middleware/authentication';
import cors from 'cors';
import 'dotenv/config';
import ClientsController from './clients/clients.controller';
import path from 'path';

class App {
  public app: express.Application;
  public port: string;

  constructor(controllers) {
    this.app = express();

    if(process.env.NODE_ENV === 'development') {
      this.app.use(cors());
    }

    this.port = process.env.PORT || "3000";

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../dist')));
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
