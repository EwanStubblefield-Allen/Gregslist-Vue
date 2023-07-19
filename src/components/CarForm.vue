<template>
  <form @submit.prevent="handleSubmit()">

    <div class="form-floating mb-3">
      <input v-model="editable.make" required type="text" class="form-control" id="make" placeholder="Make...">
      <label for="make">Make</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.model" required type="text" class="form-control" id="model" placeholder="Model...">
      <label for="model">Model</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.imgUrl" required type="url" class="form-control" id="imgUrl" placeholder="ImgUrl...">
      <label for="imgUrl">ImgUrl</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.year" required type="number" class="form-control" id="year" placeholder="Year..." min="1800" max="2027">
      <label for="year">Year</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.price" required type="number" class="form-control" id="price" placeholder="Price..." min="0" max="100000000">
      <label for="price">Price</label>
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="editable.description" class="form-control" placeholder="Leave a description here" id="description"
        style="height: 100px"></textarea>
      <label for="description">Description</label>
    </div>
    <div class="mb-3">
      <label for="color" class="form-label">Color</label>
      <input v-model="editable.color" type="color" class="form-control form-control-color" id="color" title="Choose your color">
    </div>
    <div class="mb-3">
      <label for="engineType">Engine Type</label>
      <select v-model="editable.engineType" class="form-select" aria-label="Default select example" id="engineType">
        <option v-for="(engineType, index) in engineTypes" :key="engineType + index" :value="engineType">
          {{ engineType }}
        </option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
</template>


<script>
import { onMounted, ref, watchEffect } from 'vue'
import { carsService } from '../services/CarsService.js'
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'

export default {
  setup() {
    const editable = ref({})

    function setFormDefaults() {
      editable.value.engineType = 'unknown'
      editable.value.color = '#7ed957'
    }

    onMounted(() => {
      setFormDefaults()
    })

    watchEffect(() => {
      if (AppState.activeCar) {
        const carWithBrokenReference = { ...AppState.activeCar }
        editable.value = carWithBrokenReference
      }
    })

    return {
      editable,
      engineTypes: [
        "unknown",
        "2 stroke",
        "4 cylinder",
        "v6",
        "v8",
        "v10",
        "v12",
        "small",
        "medium",
        "large",
        "chuncko"
      ],

      handleSubmit() {
        if (editable.value.id) {
          this.editCar()
        }
        else {
          this.createCar()
        }
      },

      async createCar() {
        try {

          const carData = editable.value

          await carsService.createCar(carData)

          editable.value = {}
          setFormDefaults()

          Modal.getOrCreateInstance('#formModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      },

      async editCar() {
        try {

          const carData = editable.value

          await carsService.editCar(carData)

          editable.value = {}
          setFormDefaults()

          Modal.getOrCreateInstance('#formModal').hide()


        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>