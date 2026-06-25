<script setup>
import { ref } from 'vue';

// 'pokemon' is active by default, meaning 'evolutions' starts turned off
const activeTab = ref('pokemon');
</script>

<template>
  <div class="mdc-tab-bar underbar" role="tablist">
    <div class="mdc-tab-scroller">
      <div class="mdc-tab-scroller__scroll-area">
        <div class="mdc-tab-scroller__scroll-content">

          <button 
            class="mdc-tab" 
            :class="{ 'mdc-tab--active': activeTab === 'pokemon' }"
            role="tab" 
            :aria-selected="activeTab === 'pokemon'" 
            @click="activeTab = 'pokemon'"
          >
            <span class="mdc-tab__content">
              <span class="mdc-tab__text-label">Pokemon</span>
            </span>
            <span class="mdc-tab-indicator" :class="{ 'mdc-tab-indicator--active': activeTab === 'pokemon' }">
              <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
          </button>

          <button 
            class="mdc-tab" 
            :class="{ 'mdc-tab--active': activeTab === 'evolutions' }"
            role="tab" 
            :aria-selected="activeTab === 'evolutions'" 
            @click="activeTab = 'evolutions'"
          >
            <span class="mdc-tab__content">
              <span class="mdc-tab__text-label">Evolutions</span>
            </span>
            <span class="mdc-tab-indicator" :class="{ 'mdc-tab-indicator--active': activeTab === 'evolutions' }">
              <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.underbar {
  position: absolute;
  left: 7.5%;
  width: 85%;
  background-color: #616161;
  z-index: 1;
}

.mdc-tab__text-label {
  font-family: 'Press Start 2P', monospace;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Material Design active styling colors */
.mdc-tab {
  opacity: 0.6;
  transition: opacity 0.2s;
}

.mdc-tab--active {
  opacity: 1;
}

.mdc-tab-indicator {
  display: none;
}

.mdc-tab-indicator--active {
  display: block;
}
</style>