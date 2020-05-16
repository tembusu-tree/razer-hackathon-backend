import * as express from 'express';
import Client from './clients.interface';
import { Request, Response } from 'express';
import { ClientService } from '../lib/mambu.services/ClientService';
import DepositAccountService from '../lib/mambu.services/DepositAccountService';
import { JwtService } from '../lib/jwt/jwt.service';

class ClientsController {
  public path = '/clients';
  public router = express.Router();
  private jwtService = new JwtService();
  private mambuClientService = new ClientService();
  private mambuAccountService = new DepositAccountService();

  clients: Client[] = [];
  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllClients);
    this.router.post(`${this.path}`, this.createClient);
  }

  getAllClients = (request: Request, response: Response) => {
    response.send(this.clients);
  };

  createClient = async (req: Request, res: Response) => {
    const client: any = {
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
    };
    console.log('create client');

    const newClient = await this.mambuClientService.create(client);
    if (newClient) {
      console.log('new client');

      const newAccount = await this.mambuAccountService.create(newClient.id);
      if (newAccount) {
        console.log('new account');

        const token = this.jwtService.sign({ email: newClient.email });
        return res.send({
          status: 200,
          token: token,
          data: {
            client: newClient,
            account: newAccount,
          },
        });
      }
    } else {
      res.send({
        status: 500,
        message: 'Failed to create client account',
      });
    }

    this.clients.push(client);
  };
}

export default ClientsController;
