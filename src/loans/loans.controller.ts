import * as express from 'express';
import { Request, Response } from 'express';
import { LoanAccountService } from '../lib/mambu.services/LoanAccountService';
import { checkToken } from '../middleware/authentication';

export class LoansController {
  public path = '/loans';
  public router = express.Router();
  private loanService = new LoanAccountService();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + '/:id', checkToken, this.getLoan);
    this.router.post(this.path, checkToken, this.createLoan);
  }

  getLoan = async (req: Request, res: Response) => {
    const id = req.param('id');
    const data = await this.loanService.get(id);

    res.json(data);
  };

  createLoan = async (req: any, res: Response) => {
    let clientId = req.user.id;
    const { amount, interestRate } = req.body;
    const data = await this.loanService.create(clientId, amount, interestRate);

    res.json(data);
  };
}
