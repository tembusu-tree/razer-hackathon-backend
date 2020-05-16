import { MambuApiService } from './BaseService';
import { v4 as uuidv4 } from 'uuid';

export class LoanAccountService extends MambuApiService {
  async get(id: string) {
    return await this.apiGet('loans/' + id);
  }

  async create(
    clientId: string,
    amount: number,
    interestRate: number,
    loanName = 'DEFAULT',
  ) {
    const loanAccount = {
      accountHolderType: 'CLIENT',
      accountHolderKey: clientId,
      productTypeKey: this.loanProductTypeKey,
      assignedBranchKey: this.branchKey,
      loanName: loanName,
      loanAmount: Math.min(amount, 20000),
      interestRate: Math.min(interestRate, 5),
      arrearsTolerancePeriod: '0',
      gracePeriod: '0',
      repaymentInstallments: '10',
      repaymentPeriodCount: '1',
      periodicPayment: '0',
      repaymentPeriodUnit: 'WEEKS',
      "disbursementDetails": {
        "customInformation": [
          {
            "value": uuidv4(),
            "customFieldID": "IDENTIFIER_TRANSACTION_CHANNEL_I"
          }
        ]
      }
    };

    return await this.apiPost('loans/', { loanAccount });
  }
}
