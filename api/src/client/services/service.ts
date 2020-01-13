import Client from '..';

abstract class Service {
  readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}

export default Service;
