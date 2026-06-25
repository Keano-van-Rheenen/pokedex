<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'pokemon'
  }
})

const emit = defineEmits(['update:modelValue'])

const tabs = [
  { id: 'pokemon', label: 'Pokemon' },
  { id: 'evolutions', label: 'Evolutions' }
]
</script>

<template>
  <div class="mdc-tab-bar underbar" role="tablist">
    <div class="mdc-tab-scroller">
      <div class="mdc-tab-scroller__scroll-area">
        <div class="mdc-tab-scroller__scroll-content">

          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="mdc-tab"
            :class="{ 'mdc-tab--active': modelValue === tab.id }"
            role="tab"
            :aria-selected="modelValue === tab.id"
            @click="emit('update:modelValue', tab.id)"
          >
            <span class="mdc-tab__content">
              <span class="mdc-tab__text-label">{{ tab.label }}</span>
            </span>
            <span class="mdc-tab-indicator" :class="{ 'mdc-tab-indicator--active': modelValue === tab.id }">
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
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;

  background-color: #616161;
  z-index: 1;
}

.mdc-tab__text-label {
  font-family: 'Press Start 2P', monospace;
  font-weight: bold;
  font-size: 1.1rem;
}

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