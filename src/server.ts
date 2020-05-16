import App from './app';
import ClientsController from './clients/clients.controller';

const app = new App([new ClientsController()]);

app.listen();
