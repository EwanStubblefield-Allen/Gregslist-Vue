<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-floating py-2">
      <input v-model="editable.imgUrl" type="url" class="form-control" id="houseImg" aria-describedby="houseImg" maxlength="300" placeholder="ImgUrl..." required>
      <label for="houseImg">Image Url</label>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-3 form-floating">
        <input v-model="editable.bedrooms" type="number" class="form-control" id="houseBeds" aria-describedby="houseBeds" placeholder="Beds..." required>
        <label for="houseBeds">Bedrooms</label>
      </div>
      <div class="col-12 col-md-3 form-floating">
        <input v-model="editable.bathrooms" type="number" class="form-control" id="houseBaths" aria-describedby="houseBaths" step=".5" placeholder="Baths..." required>
        <label for="houseBaths">Bathrooms</label>
      </div>
    </div>
    <div class="row justify-content-center py-2">
      <div class="col-12 col-md-3 form-floating">
        <input v-model="editable.year" type="number" class="form-control" id="houseYear" aria-describedby="houseYear" min="1900" max="2023" placeholder="Year..." required>
        <label for="houseYear">Year</label>
      </div>
      <div class="col-12 col-md-3 form-floating">
        <input v-model="editable.levels" type="number" class="form-control" id="houseLevels" aria-describedby="houseLevels" placeholder="Levels..." required>
        <label for="houseLevels">Levels</label>
      </div>
      <div class="col-12 col-md-3 form-floating">
        <input v-model="editable.price" type="number" class="form-control" id="housePrice" aria-describedby="housePrice" placeholder="Price..." required>
        <label for="housePrice">Price</label>
      </div>
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="editable.description" class="form-control" placeholder="Leave a description here" id="description" style="height: 100px"></textarea>
      <label for="description">Description</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const editable = ref({})
    /* -------------------------------------------------------------------------- */
    watchEffect(() => {
      if (AppState.activeHouse) {
        editable.value = AppState.activeHouse
      }
    })
    async function createHouse() {
      try {
        await housesService.createHouse(editable.value)
      } catch (error) {
        Pop.error(error.message, '[CREATING HOUSE]')
      }
    }
    async function updateHouse() {
      try {
        await housesService.updateHouse()
      } catch (error) {
        Pop.error(error.message, '[UPDATE HOUSE]')
      }
    }
    /* -------------------------------------------------------------------------- */
    return {
      editable,

      handleSubmit() {
        if (editable.value.id) {
          updateHouse()
        } else {
          createHouse()
        }
        Modal.getOrCreateInstance('#formModal').hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>