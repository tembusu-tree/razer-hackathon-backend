import App from './app';
import ClientsController from './clients/clients.controller';
import HealthCheckController from './healthcheck/healthcheck.controller';

const app = new App([new HealthCheckController(), new ClientsController()]);

app.listen();
