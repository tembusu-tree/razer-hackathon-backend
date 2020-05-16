import axios, { AxiosRequestConfig } from 'axios';

export class MambuApiService {
  protected apiUrl: string;
  protected username: string;
  protected password: string;
  protected branchKey: string;
  protected savingsProductTypeKey: string;
  protected loanProductTypeKey: string;
  protected config: AxiosRequestConfig;

  constructor() {
    this.apiUrl = process.env.MAMBU_BASE_URL;
    this.username = process.env.MAMBU_USERNAME;
    this.password = process.env.MAMBU_PASSWORD;
    this.branchKey = process.env.MAMBU_BRANCH_KEY;
    this.savingsProductTypeKey = process.env.MAMBU_SAVINGS_PRODUCT_TYPE_KEY;
    this.loanProductTypeKey = process.env.MAMBU_LOAN_PRODUCT_TYPE_KEY;

    this.config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      auth: {
        username: this.username,
        password: this.password,
      },
    };
  }

  async apiGet(url: string) {
    const res = await axios.get(this.apiUrl + '/' + url, this.config);
    console.log('GET to Mambu', url, res);
    return res.data;
  }

  async apiPost(url: string, body: any) {
    try {
      url = this.apiUrl + '/' + url;
      console.log('POST to Mambu', url, body);
      const res = await axios.post(
        url,
        body,
        this.config,
      );
      return res.data;
    } catch (e) {
      console.log(e.response.data);
      throw e;
    }
  }
}
