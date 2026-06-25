<script setup>
import { MDCTopAppBar } from '@material/top-app-bar'
import { MDCDrawer } from '@material/drawer'
import { onMounted } from 'vue'

import Header from './components/Header.vue'
import HamburgerSheet from './components/hamburger-sheet.vue'
import { RouterView } from 'vue-router'

let navigation_drawer

onMounted(() => {
  const drawerEl = document.querySelector('.mdc-drawer')
  navigation_drawer = MDCDrawer.attachTo(drawerEl)

  drawerEl.querySelector('.mdc-list').addEventListener('click', () => {
    navigation_drawer.open = false
  })
})

const openDrawer = () => {
  navigation_drawer.open = true
}
</script>

<template>
  <Header @toggle="openDrawer" />
  <HamburgerSheet />

  <main class="bodycontainer mdc-top-app-bar--fixed-adjust">
    <div class="stripeback">
      <div class="stripebackshadow"></div>
    </div>

    <div class="content">
      <RouterView />
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
  overflow: hidden; /* IMPORTANT: page does NOT scroll */
}

/* MAIN LAYOUT */
.bodycontainer {
  display: flex;
  height: 100vh; /* IMPORTANT: defines scroll boundary */
}

/* SIDE STRIPES */
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

/* SCROLL AREA */
.content {
  flex: 1;
  min-height: 0;       /* CRITICAL FIX */
  overflow-y: auto;    /* THIS is your scrollbar */
  display: flex;
  justify-content: center;
}

/* optional wrapper so grid stays centered */
.content > * {
  width: 100%;
}
</style>