import { Router } from 'express';

class HealthCheckController {
  public path = '/ping';
  public router = Router();
  constructor() {
    this.initializeRouter();
  }

  public initializeRouter() {
    this.router.get(this.path, (req, res) => {
      res.json('pong');
    });
  }
}

export default HealthCheckController;
