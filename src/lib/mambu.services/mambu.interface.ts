export interface MambuClient {
    "encodedKey": string,
    "state": 'ACTIVE' | 'INACTIVE',
    "id": string,
    "creationDate": Date,
    "lastModifiedDate": Date,
    "activationDate": Date,
    "firstName": string,
    "lastName": string,
    "middleName": string,
    "homePhone": string,
    "mobilePhone1": string,
    "birthDate": Date,
    "gender": "MALE" | "FEMALE",
    "notes": string,
    "assignedBranchKey": string,
    "loanCycle": number,
    "groupLoanCycle": number,
    customInformation: [MambuCustomInformation]
}

export interface MambuCustomInformation {
    "encodedKey": string,
    "parentKey": string,
    "customFieldKey": string,
    "customField": {
        encodedKey: string,
        "name": string,
        "type": string,
        "dataType": string,
        "isDefault": boolean,
        "isRequired": boolean,
        "indexInList": number
    },
    "value": string,
    "indexInList": number
}