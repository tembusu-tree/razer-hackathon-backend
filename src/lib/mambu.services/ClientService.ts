import Client from '../../clients/clients.interface';
import { MambuClient } from './mambu.interface';
import { MambuApiService } from './BaseService';
import { v4 as uuidv4 } from 'uuid';

export class ClientService extends MambuApiService {
  private mapResponse(data: MambuClient): Client {
    return {
      id: data.encodedKey,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  }

  async get(id: string): Promise<Client> {
    const res = await this.apiGet('clients/' + id + '?fullDetails=true');

    const data: MambuClient = res.client;

    return this.mapResponse(data);
  }

  async create(client: Client): Promise<Client> {
    const body = {
      client: {
        firstName: client.firstName,
        lastName: client.lastName,
        preferredLanguage: 'ENGLISH',
        notes: 'Enjoys playing RPG',
        assignedBranchKey: this.branchKey,
      },
      idDocuments: [
        {
          identificationDocumentTemplateKey: '8a8e867271bd280c0171bf7e4ec71b01',
          issuingAuthority: 'Immigration Authority of Singapore',
          documentType: 'NRIC/Passport Number',
          validUntil: '2021-09-12',
          documentId: 'S9812345A',
        },
      ],
      addresses: [],
      customInformation: [
        {
          value: 'Singapore',
          customFieldID: 'countryOfBirth',
        },
        {
          value: uuidv4(),
          customFieldID: 'razerID',
        },
      ],
    };

    const res = await this.apiPost('clients', body);
    console.log('data: ', res);
    const data: MambuClient = res.client;

    return this.mapResponse(data);
  }
}
