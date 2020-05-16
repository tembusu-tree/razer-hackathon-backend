import * as express from 'express';
import Client from './clients.interface';
import { Request, Response } from 'express';

class ClientsController {
  public path = '/clients';
  public router = express.Router();

  clients: Client[] = [];
  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllClients);
    this.router.post(this.path, this.createClient);
  }

  getAllClients = (request: Request, response: Response) => {
    response.send(this.clients);
  };

  createClient = (req: Request, res: Response) => {
    const client: Client = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      acra: req.body.acra,
      email: req.body.email,
      mobile: req.body.mobile,
    };
    this.clients.push(client);
    console.log('create client');
    res.send(client);
  };
}

export default ClientsController;
