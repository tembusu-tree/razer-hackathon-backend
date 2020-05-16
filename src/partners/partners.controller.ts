import * as express from 'express';
import { checkToken } from '../middleware/authentication';

const data = {
  "online": [
    {
      "name": "GoDaddy",
      "services": ["Website Design, Hosting, Domain Purchase"],
      "description": "GoDaddy helps to provide an end to end website service from creating your domain name to hosting your website",
      "key": "godaddy"
    },
    {
      "name": "Microsoft Azure",
      "services": ["Cloud Computing"],
      "description": "Azure helps to provide enterprise grade cloud computing software for all your business needs.",
      "key": "azure"
    },
    {
      "name": "AWS",
      "services": ["Cloud Computing"],
      "description": "AWS helps to provide enterprise grade cloud computing software for all your business needs",
      "key": "aws"
    },
    {
      "name": "Office 365",
      "services": ["Productivity", "Teamwork"],
      "description": "Office 365 helps you to increase your productivity in the workspace across your team",
      "key": "office_365"
    },
    {
      "name": "Intuit",
      "services": ["Accounting Software"],
      "description": "Intuit provides accounting software package for SMEs",
      "key": "intuit"
    }
  ],
  "store_front": [
    {
      "name": "Shopify",
      "services": ["e-commerce", "store management"],
      'description': "Shopify helps you to manage your online store.",
      "key": "shopify"
    },
    {
      "name": "MokaPOS",
      "services": ["POS", "store management"],
      "description": "Moka helps to equip your offline store front with POS systems that are available.",
      "key": "moka_pos"
    },
    {
      "name": "WeWork",
      "services": ["shared spaces", "office spaces"],
      "description": "WeWork allows you to find the perfect space for your store front",
      "key": "wework"
    }
  ],
  "food": [
    {
      "name": "GrabFood",
      "services": ["food delivery"],
      "description": "WeWork allows you to find the perfect space for your store front",
      "key": "wework"
    },
    {
      "name": "FoodPanda",
      "services": ["food delivery"],
      "description": "FoodPanda helps you to deliver your food to the doorsteps of your customers",
      "key": "food_panda"
    },
    {
      "name": "Red Mart",
      "services": ["groceries"],
      "description": "Red Mart helps you to get the highest quality ingredients online",
      "key": "red_mart"
    }
  ],
  "fashion": [
    {
      "name": "Shopback",
      "services": ["Cashback"],
      "description": "Shopback gives you generous cashbacks for your purchases",
      "key": "shopback"
    },
    {
      "name": "Zalora",
      "services": ["Fashion"],
      "description": "Zalora lets you sell your online clothes",
      "key": "zalora"
    }
  ]
};

export class PartnersController {
  public path = '/partners';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, checkToken, this.getPartners);
    // this.router.post(this.path, this.createLoan);
  }

  getPartners(req: express.Request, res: express.Response) {
    res.json(data);
  }
}