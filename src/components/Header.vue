<script setup>
// Geef aan dat deze component een 'toggle' event kan versturen
const emit = defineEmits(['toggle'])
</script>

<template>
    <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <!-- Stuur het event af bij een klik -->
                <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                    aria-label="Open navigation menu" @click="emit('toggle')">menu</button>

                <span class="mdc-top-app-bar__title">POKEDEX</span>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                    aria-label="Search">search</button>
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




</style>