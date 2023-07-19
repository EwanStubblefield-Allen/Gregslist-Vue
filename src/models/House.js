export class House {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator || 'Anonymous'
    this.year = data.year
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.price = data.price
    this.description = data.description || 'None'
    this.imgUrl = data.imgUrl
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}