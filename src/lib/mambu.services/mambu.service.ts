import { ClientService } from './ClientService';
import DepositAccountService from './DepositAccountService';

export class MambuService {
  public clients: ClientService;
  public depositAccounts: DepositAccountService;

  constructor() {
    this.clients = new ClientService();
    this.depositAccounts = new DepositAccountService();
  }
}
