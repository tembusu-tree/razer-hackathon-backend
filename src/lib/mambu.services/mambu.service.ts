import Client from "../../clients/clients.interface";
import axios from 'axios';
import { MambuClient, MambuDepositAccount } from "./mambu.interface";

const fieldNames = {
    acra: "acraNumber",
    email: "email"
}

export class MambuService {
    public clients: ClientService;
    public depositAccounts: DepositAccountService;

    constructor() {
        this.clients = new ClientService();
        this.depositAccounts = new DepositAccountService();
    }
}

class MambuApiService {
    protected apiUrl: string;
    protected username: string;
    protected password: string;
    protected branchKey: string;
    protected productTypeKey: string;
    protected config: any;

    constructor() {
        this.apiUrl = process.env.MAMBU_BASE_URL;
        this.username = process.env.MAMBU_USERNAME;
        this.password = process.env.MAMBU_PASSWORD;
        this.branchKey = process.env.MAMBU_BRANCH_KEY;
        this.productTypeKey = process.env.MAMBU_PRODUCT_TYPE_KEY;

        this.config = {
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, auth: {
                username: this.username,
                password: this.password
            }
        }
    }

    async apiGet(url: string) {
        let res = await axios.get(new URL(url, this.apiUrl).toString());
        console.log("GET to Mambu", url, res);
        return res.data;
    }

    async apiPost(url: string, body: any) {
        let res = await axios.post(new URL(url, this.apiUrl).toString(), body, this.config);
        console.log("POST to Mambu", url, body, res);
        return res.data;
    }
}

class ClientService extends MambuApiService {
    async get(id: string): Promise<Client> {
        let res = await this.apiGet('clients/' + id + '?fullDetails=true');

        let data: MambuClient = res.data.client;

        return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.customInformation.find(i => i.customField.name === fieldNames.email).value,
            acra: data.customInformation.find(i => i.customField.name === fieldNames.acra).value,
            mobile: data.mobilePhone1,
        };
    }

    async create(client: Client): Promise<boolean> {
        let body = {
            firstName: client.firstName,
            lastName: client.lastName,
            assignedBranchKey: this.branchKey,
            mobilePhone1: client.mobile,
            customInformation: [
                {
                    value: client.acra,
                    customFieldID: "acraNumber"
                },
                {
                    value: client.email,
                    customFieldID: "email"
                }
            ]
        }
        await this.apiPost('clients', body);
        return true;
    }
}

class DepositAccountService extends MambuApiService {
    async get(id: string): Promise<MambuDepositAccount> {
        return await this.apiGet('savings/' + id + '?fullDetails=true');
    }

    async create(userId: string, accountName: string = 'DEFAULT'): Promise<boolean> {
        let savingsAccount = {
            name: accountName,
            accountType: "CURRENT_ACCOUNT",
            accountState: 'APPROVED',
            accountHolderType: 'CLIENT',
            accountHolderKey: userId,
            productTypeKey: this.productTypeKey
        };

        await this.apiPost('savings', { savingsAccount });

        return true;
    }

    async deposit(accountId: string, amount: number): Promise<MambuDepositAccount> {
        let body = {
            amount,
            notes: "Deposit into savings account",
            type: "DEPOSIT",
            method: "bank",
        };

        return await this.apiPost(`savings/${accountId}/transactions`, body);
    }

    async transfer(accountId: string, toAccountId: string, accountType: 'SAVINGS' | 'LOAN', amount: number) {
        let body: any = {
            amount,
            notes: "Transfer",
            type: "TRANSFER",
            method: 'bank'
        }

        if (accountType === 'SAVINGS') {
            body.toSavingsAccount = toAccountId;
        }
        else {
            body.toLoanAccount = toAccountId;
        }

        return await this.apiPost(`savings/${accountId}/transactions`, body);
    }
}

class LoanAccountService extends MambuApiService {
    get(id: string) {

    }
}

