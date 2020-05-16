import Client from '../../clients/clients.interface';
import { MambuClient } from './mambu.interface';
import { MambuApiService } from './BaseService';

const fieldNames = { acra: 'acraNumber', email: 'email' };

export class ClientService extends MambuApiService {
  async get(id: string): Promise<Client> {
    const res = await this.apiGet('clients/' + id + '?fullDetails=true');

    const data: MambuClient = res.data.client;

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.customInformation.find(
        (i) => i.customField.name === fieldNames.email,
      ).value,
      acra: data.customInformation.find(
        (i) => i.customField.name === fieldNames.acra,
      ).value,
      mobile: data.mobilePhone1,
    };
  }

  async create(client: Client): Promise<boolean> {
    const body = {
      firstName: client.firstName,
      lastName: client.lastName,
      assignedBranchKey: this.branchKey,
      mobilePhone1: client.mobile,
      customInformation: [
        {
          value: client.acra,
          customFieldID: 'acraNumber',
        },
        {
          value: client.email,
          customFieldID: 'email',
        },
      ],
    };
    await this.apiPost('clients', body);
    return true;
  }
}
