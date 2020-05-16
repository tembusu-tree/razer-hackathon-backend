import { ClientService } from './ClientService';
import DepositAccountService from './DepositAccountService';
import { LoanAccountService } from './LoanAccountService';

export class MambuService {
  public clients: ClientService;
  public depositAccounts: DepositAccountService;
  public loanAccounts: LoanAccountService;
  
  constructor() {
    this.clients = new ClientService();
    this.depositAccounts = new DepositAccountService();
    this.loanAccounts = new LoanAccountService();
  }
}
