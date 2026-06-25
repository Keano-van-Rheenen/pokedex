export async function getPokemons() {
    let pokemons = JSON.parse(localStorage.getItem("pokemons") ?? "[]");
    if (pokemons.length) return pokemons;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1500`)
    const data = await res.json()

    pokemons = data.results.map(p => {
        const id = Number(p.url.split('/').filter(Boolean).pop())

        return {
            id,
            name: p.name.replaceAll('-', ' '),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
    });

    localStorage.setItem("pokemons", JSON.stringify(pokemons));
    return pokemons;
}

export async function getPokemonById(id) {
    const pokemons = JSON.parse(localStorage.getItem("pokemons") ?? "[]");
    const index = pokemons.findIndex(x => x.id == id);
    if (index === -1)
        return null;

    if (pokemons[index]?.abilities)
        return pokemons[index];

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    pokemons[index].abilities = data.abilities.map(ability => {
        return {
            name: ability.ability.name,
            isHidden: ability.is_hidden
        };
    });

    pokemons[index].stats = data.stats.map(stat => {
        return {
            base: stat.base_stat,
            name: stat.stat.name
        };
    });

    pokemons[index].types = data.types.map(type => {
        const id = Number(type.type.url.split('/').filter(Boolean).pop());

        return {
            name: type.type.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-shining-pearl/${id}.png`
        };
    });

    localStorage.setItem("pokemons", JSON.stringify(pokemons));
    return pokemons[index];
}