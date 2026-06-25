<script setup>
const emit = defineEmits(['toggle', 'search'])
</script>

<template>
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">

      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button
          class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
          aria-label="Open navigation menu"
          @click="emit('toggle')">
          menu
        </button>

        <span class="mdc-top-app-bar__title">POKEDEX</span>
      </section>

      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
        <input
          class="search-input"
          type="text"
          placeholder="Search Pokémon..."
          @input="emit('search', $event.target.value)"
        />
      </section>

    </div>
  </header>
</template>

<style>
.mdc-top-app-bar {
  --mdc-theme-primary: #313131;
}

.mdc-top-app-bar__section:first-child {
  justify-content: space-between;
  color: red;
  font-family: 'Press Start 2P', monospace;
  letter-spacing: 5px;
  font-size: 45px;
}

.search-input {
  width: 200px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 14px;
}

@media (max-width: 600px) {
  .search-input {
    width: 120px;
    font-size: 12px;
    padding: 5px 8px;
  }

  .mdc-top-app-bar__title {
    font-size: 14px;
    letter-spacing: 2px;
  }
}
</style>