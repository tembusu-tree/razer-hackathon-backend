import { MambuDepositAccount } from './mambu.interface';
import { MambuApiService } from './BaseService';

class DepositAccountService extends MambuApiService {
  async get(id: string): Promise<MambuDepositAccount> {
    return await this.apiGet('savings/' + id + '?fullDetails=true');
  }

  async create(userId: string, accountName = 'DEFAULT'): Promise<boolean> {
    const savingsAccount = {
      name: accountName,
      accountType: 'CURRENT_ACCOUNT',
      accountState: 'APPROVED',
      accountHolderType: 'CLIENT',
      accountHolderKey: userId,
      productTypeKey: this.savingsProductTypeKey,
      "currencyCode": "SGD",
      "allowOverdraft": true,
      "overdraftLimit": "100",
      "overdraftInterestSettings": {
        "interestRate": 5
      },
      "interestSettings": {
        "interestRate": "1.25"
      }
    };

    return await this.apiPost('savings', { savingsAccount });
  }

  async deposit(
    accountId: string,
    amount: number,
  ): Promise<MambuDepositAccount> {
    const body = {
      amount,
      notes: 'Deposit into savings account',
      type: 'DEPOSIT',
      method: 'bank',
    };

    return await this.apiPost(`savings/${accountId}/transactions`, body);
  }

  async transfer(
    accountId: string,
    toAccountId: string,
    accountType: 'SAVINGS' | 'LOAN',
    amount: number,
  ) {
    const body: any = {
      amount,
      notes: 'Transfer',
      type: 'TRANSFER',
      method: 'bank',
    };

    if (accountType === 'SAVINGS') {
      body.toSavingsAccount = toAccountId;
    } else {
      body.toLoanAccount = toAccountId;
    }

    return await this.apiPost(`savings/${accountId}/transactions`, body);
  }
}

export default DepositAccountService;
