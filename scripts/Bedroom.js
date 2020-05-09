class Bedroom {
  constructor(api, coordinates) {
    this.id = coordinates.id;
    this.picture = this.getMediumSizePhoto(api.photo);
    this.propetyType = api.property_type;
    this.name = api.name;
    this.price = api.price;
    this.latitude = coordinates.latitude;
    this.longitude = coordinates.longitude;
  }

  getMediumSizePhoto(photoUrl) {
    return photoUrl.split("=")[0] + "=large"
  }
}
