class Bedroom {
  constructor(api, coordinates) {
    this.id = idGenerator.newID();
    this.picture = api.photo;
    this.propetyType = api.property_type;
    this.name = api.name;
    this.price = api.price;
    this.latitude = coordinates.latitude;
    this.longitude = coordinates.longitude;
  }
}
