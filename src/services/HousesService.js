import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
  setActiveHouse(house) {
    AppState.activeHouse = house
  }

  async getHouses() {
    const res = await api.get('/api/houses')
    AppState.houses = res.data.map(r => new House(r)).reverse()
  }

  async createHouse(data) {
    const res = await api.post('/api/houses', data)
    AppState.houses.unshift(new House(res.data))
  }

  async removeHouse(id) {
    await api.delete(`/api/houses/${id}`)
    const houses = AppState.houses
    const houseIndex = houses.findIndex(h => h.id == id)
    if (houseIndex == -1) {
      throw new Error('The index does not exist!')
    }
    houses.splice(houseIndex, 1)
  }

  async updateHouse() {
    const house = AppState.activeHouse
    const res = await api.put(`/api/houses/${house.id}`, house)
    const houses = AppState.houses
    const houseIndex = houses.findIndex(h => h.id == house.id)
    if (houseIndex == -1) {
      throw new Error('The index does not exist!')
    }
    houses.splice(houseIndex, 1, new House(res.data))
  }
}

export const housesService = new HousesService()