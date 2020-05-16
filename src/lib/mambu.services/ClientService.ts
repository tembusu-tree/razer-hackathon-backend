import Client from '../../clients/clients.interface';
import { MambuClient } from './mambu.interface';
import { MambuApiService } from './BaseService';

const fieldNames = { acra: 'acraNumber', email: 'email' };

export class ClientService extends MambuApiService {
  private mapResponse(data: MambuClient) {
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

  async get(id: string): Promise<Client> {
    const res = await this.apiGet('clients/' + id + '?fullDetails=true');

    const data: MambuClient = res.client;

    return this.mapResponse(data);
  }

  async create(client: Client): Promise<Client> {
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

    const res = await this.apiPost('clients?fullDetails=true', body);
    const data: MambuClient = res.client;

    return this.mapResponse(data);
  }
}
