import Client from '../../clients/clients.interface';
import { MambuClient } from './mambu.interface';
import { MambuApiService } from './BaseService';

const fieldNames = { acra: 'acraNumber', email: 'email' };

export class ClientService extends MambuApiService {
  // private mapResponse(data: MambuClient) {
  //   return {
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.idDocuments.find(
  //       (i) => i.issuingAuthority === fieldNames.email,
  //     ).value,
  //     acra: data.customInformation.find(
  //       (i) => i.customField.name === fieldNames.acra,
  //     ).value,
  //     mobile: data.mobilePhone1,
  //   };
  // }

  async get(id: string): Promise<any> {
    const res = await this.apiGet('clients/' + id + '?fullDetails=true');

    const data: MambuClient = res.client;

    return data;
  }

  async create(client: Client): Promise<any> {
    const body = {
      "client": {
        "firstName": client.firstName,
        "lastName": client.lastName,
        "preferredLanguage": "ENGLISH",
        "notes": "Enjoys playing RPG",
        "assignedBranchKey": this.branchKey
      },
      "idDocuments": [
        {
          "identificationDocumentTemplateKey": "8a8e867271bd280c0171bf7e4ec71b01",
          "issuingAuthority": "Immigration Authority of Singapore",
          "documentType": "NRIC/Passport Number",
          "validUntil": "2021-09-12",
          "documentId": "S9812345A"
        }
      ],
      "addresses": [],
      "customInformation": [
        {
          "value": "Singapore",
          "customFieldID": "countryOfBirth"

        },
        {
          "value": "{{$guid}}",
          "customFieldID": "razerID"
        }
      ]
    }

    const res = await this.apiPost('clients?fullDetails=true', body);
    const data: MambuClient = res.client;

    return data;
  }
}
