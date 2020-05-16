export interface MambuClient {
  encodedKey: string;
  state: 'ACTIVE' | 'INACTIVE';
  id: string;
  creationDate: Date;
  lastModifiedDate: Date;
  activationDate: Date;
  firstName: string;
  lastName: string;
  middleName: string;
  homePhone: string;
  mobilePhone1: string;
  birthDate: Date;
  gender: 'MALE' | 'FEMALE';
  notes: string;
  assignedBranchKey: string;
  loanCycle: number;
  groupLoanCycle: number;
  customInformation: [MambuCustomInformation];
}

export interface MambuCustomInformation {
  encodedKey: string;
  parentKey: string;
  customFieldKey: string;
  customField: {
    encodedKey: string;
    name: string;
    type: string;
    dataType: string;
    isDefault: boolean;
    isRequired: boolean;
    indexInList: number;
  };
  value: string;
  indexInList: number;
}

export interface MambuDepositAccount {
  encodedKey;
  id;
  accountHolderKey;
  accountHolderType: 'CLIENT';
  name: 'Daily Savings';
  creationDate: '2012-06-20T16:07:21+0200';
  activationDate: '2012-06-20T14:07:34+0200';
  lastModifiedDate: '2012-06-29T11:49:17+0200';
  lastInterestCalculationDate: '2012-06-23T00:00:00+0200';
  lastAccountAppraisalDate: '2012-06-23T11:02:43+0200';
  productTypeKey: '402832b43809601c01380963a8de033d';
  accountType: 'REGULAR_SAVINGS';
  accountState: 'ACTIVE';
  balance: '35';
  accruedInterest: '4.5';
  overdraftInterestAccrued: '0';
  overdraftAmount: '0';
  interestDue: '0';
  feesDue: '0';
  allowOverdraft: false;
  allowTechnicalOverdraft: false;
  notes: 'Some notes';
  interestPaymentPoint: 'ON_ACCOUNT_MATURITY';
  interestPaymentDates: [
    {
      dayOfMonth: 1;
      monthOfYear: 4;
      year: 0;
    },
  ];

  customFieldValues: [
    {
      encodedKey: '8ac91de9437b5b7b01437c938fac002a';
      parentKey: '402832b43809601c013809639d6400e5';
      customFieldKey: '8ac91de9430fd40201430fdc15a60361';
      customField: {
        encodedKey: '8ac91de9430fd40201430fdc15a60361';
        id: 'INTEREST';
        name: 'Interest';
        type: 'SAVINGS_ACCOUNT_INFO';
        dataType: 'SELECTION';
        valueLength: 'SHORT';
        isDefault: false;
        isRequired: false;
        values: ['None', 'One', 'Ten'];
        amounts: {
          Ten: '10';
          None: '0';
          One: '1';
        };
        customFieldSet: {
          encodedKey: '8ac91de9430fd40201430fdc15580350';
          name: 'Savings Account Info';
          createdDate: '2013-12-20T11:55:18+0000';
          indexInList: 0;
          type: 'SAVINGS_ACCOUNT_INFO';
        };
        indexInList: -1;
        state: 'NORMAL';
      };
      value: 'Ten';
      amount: '10';
      indexInList: -1;
      customFieldID: 'INTEREST';
    },
    {
      encodedKey: '8ac91de9437b5b7b01437c938fac002b';
      parentKey: '402832b43809601c013809639d6400e5';
      customFieldKey: '8ac91de9430fd40201430fdc15ae0363';
      customField: {
        encodedKey: '8ac91de9430fd40201430fdc15ae0363';
        id: 'HAS_CHILDREN_INFO';
        name: 'Is more than salary';
        type: 'IS_MORE_THAN_SALARY';
        dataType: 'CHECKBOX';
        valueLength: 'SHORT';
        isDefault: false;
        isRequired: false;
        customFieldSet: {
          encodedKey: '8ac91de9430fd40201430fdc15580350';
          name: 'Savings account info';
          createdDate: '2013-12-20T11:55:18+0000';
          indexInList: 0;
          type: 'SAVINGS_ACCOUNT_INFO';
        };
        indexInList: -1;
        state: 'NORMAL';
      };
      value: 'TRUE';
      indexInList: -1;
      customFieldID: 'IS_MORE_THAN_SALARY';
    },
  ];
}
