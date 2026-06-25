<script setup>
import { MDCDrawer } from '@material/drawer'
import { onMounted, ref } from 'vue'

import Header from './components/Header.vue'
import HamburgerSheet from './components/hamburger-sheet.vue'
import { RouterView } from 'vue-router'

const searchQuery = ref('')
let navigation_drawer

onMounted(() => {
  const drawerEl = document.querySelector('.mdc-drawer')
  navigation_drawer = MDCDrawer.attachTo(drawerEl)

  drawerEl.querySelector('.mdc-list').addEventListener('click', () => {
    navigation_drawer.open = false
  })
})

function handleSearch(value) {
  searchQuery.value = value
}

function openDrawer() {
  navigation_drawer.open = true
}
</script>

<template>
  <Header
    @toggle="openDrawer"
    @search="handleSearch"
  />

  <HamburgerSheet />

  <main class="bodycontainer mdc-top-app-bar--fixed-adjust">
    <div class="stripeback">
      <div class="stripebackshadow"></div>
    </div>

    <div class="content">
      <RouterView :search="searchQuery" />
    </div>

    <div class="stripeback">
      <div class="stripebackshadow"></div>
    </div>
  </main>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.bodycontainer {
  display: flex;
  height: 100vh;
}

.stripeback {
  width: 15%;
  height: 100%;
  position: relative;
  background-image: url("/pokeback.png");
}

.stripebackshadow {
  width: 50%;
  height: 100%;
  background: black;
  opacity: 0.72;
}

.stripeback:last-child .stripebackshadow {
  position: absolute;
  left: 50%;
}

.content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.content > * {
  width: 100%;
}
</style>