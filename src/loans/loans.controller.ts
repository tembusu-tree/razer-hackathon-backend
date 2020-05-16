import * as express from 'express';
import { Request, Response } from 'express';
import { MambuService } from '../lib/mambu.services/mambu.service';

export class LoansController {
  public path = '/loans';
  public router = express.Router();

  constructor(private mambuService: MambuService) {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + '/:id', this.getLoan);
    this.router.post(this.path, this.createLoan);
  }

  async getLoan(req: Request, res: Response) {
    const id = req.param('id');
    const data = await this.mambuService.loanAccounts.get(id);

    res.json(data);
  }

  async createLoan(req: Request, res: Response) {
    const { clientId, amount, interestRate } = req.body;
    const data = await this.mambuService.loanAccounts.create(
      clientId,
      amount,
      interestRate,
    );

    res.json(data);
  }
}
