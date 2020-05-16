import axios from 'axios';

export class MambuApiService {
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
    const res = await axios.get(new URL(url, this.apiUrl).toString());
    console.log('GET to Mambu', url, res);
    return res.data;
  }

  async apiPost(url: string, body: any) {
    const res = await axios.post(
      new URL(url, this.apiUrl).toString(),
      body,
      this.config,
    );
    console.log('POST to Mambu', url, body, res);
    return res.data;
  }
}
