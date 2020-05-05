class Http {
  constructor() {
    this.url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
  }

  async get() {
    const response = await fetch(this.url, {
      method: 'GET',
    });

    console.log('response :>> ', response);

    return await response.json();
  }
}
