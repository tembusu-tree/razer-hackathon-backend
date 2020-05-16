import express from 'express';

import * as bodyParser from 'body-parser';

import 'dotenv/config';
// import * as mongoose from 'mongoose';
// const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
// mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
class App {
  public app: express.Application;
  public port: string;

  constructor(controllers) {
    this.app = express();
    this.port = process.env.BACKEND_PORT;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      console.log('add router');
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
