import express from 'express';

import * as bodyParser from 'body-parser';
import { checkToken } from './middleware/authentication';
import cors from 'cors';
import 'dotenv/config';

class App {
  public app: express.Application;
  public port: string;

  constructor(controllers) {
    this.app = express();
    this.app.use(cors());
    this.port = process.env.BACKEND_PORT;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.get('/', checkToken);
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
