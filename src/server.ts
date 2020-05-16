import App from './app';
import ClientsController from './clients/clients.controller';
import HealthCheckController from './healthcheck/pongRouter';

const app = new App([new HealthCheckController(), new ClientsController()]);

app.listen();
