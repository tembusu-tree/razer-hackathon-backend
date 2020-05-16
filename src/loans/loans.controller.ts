import * as express from 'express';
import { Request, Response } from 'express';
import { LoanAccountService } from '../lib/mambu.services/LoanAccountService';

export class LoansController {
  public path = '/loans';
  public router = express.Router();
  private loanService = new LoanAccountService();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + '/:id', this.getLoan);
    this.router.post(this.path, this.createLoan);
  }

  getLoan = async (req: Request, res: Response) =>  {
    const id = req.param('id');
    const data = await this.loanService.get(id);

    res.json(data);
  }

  createLoan = async (req: Request, res: Response) => {
    const { clientId, amount, interestRate } = req.body;
    const data = await this.loanService.create(
      clientId,
      amount,
      interestRate,
    );

    res.json(data);
  }
}
