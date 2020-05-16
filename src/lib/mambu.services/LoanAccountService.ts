import { MambuApiService } from './BaseService';

export class LoanAccountService extends MambuApiService {
  async get(id: string) {
    return await this.apiGet('loans/' + id);
  }

  async create(clientId: string, amount: number, interestRate: number, loanName: string = 'DEFAULT') {
    var loanAccount = {
      "accountHolderType": "CLIENT",
      "accountHolderKey": clientId,
      "productTypeKey": this.loanProductTypeKey,
      "assignedBranchKey": this.branchKey,
      "loanName": loanName,
      "loanAmount": Math.min(amount, 20000),
      "interestRate": Math.min(interestRate, 5),
      "arrearsTolerancePeriod": "0",
      "gracePeriod": "0",
      "repaymentInstallments": "10",
      "repaymentPeriodCount": "1",
      "periodicPayment": "0",
      "repaymentPeriodUnit": "WEEKS",
    };

    return await this.apiPost('loans/', {loanAccount});
  }
}
