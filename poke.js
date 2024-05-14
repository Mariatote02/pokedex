const ver = document.getElementById('pokemones');
const pokedex = document.getElementById('pokemon_container');
const buscar = document.getElementById('buscar_btn');
let namePokemon = document.getElementById('pokemon_name');
const buscador = document.querySelector('.busqueda');
let pokemon_name_input = document.getElementById("pokemon_name_input");
ver.addEventListener('click', llamar);


function llamar() {
    let peticion = fetch("https://pokeapi.co/api/v2/pokemon/?offset=00&limit=151")
    .then(peticion => peticion.json())
    .then(data => {
        console.log(data);
        html =  "";
        html = html + pintar(data);
        buscador.classList.add('open');
    })

}

async function pintar(info) {
    console.log(info.results[4].name);
    html = "";
    for (let i = 0; i < info.results.length; i++) {        
        let poke = await nombre(info.results[i].name);
        console.log(poke.name);
          html = html + `
            <div class="Content-ficha">
            <img class="Content-ficha-pokedex" src="./pokedezzzz.png">
            <img class="Content-ficha-img" src="${poke.sprites.other["official-artwork"].front_default}" alt="">
            <h3 class="Content-ficha-name">${poke.name}</h3>
            <p class="Content-ficha-mas" onclick="verMas()">ver mas</p>
            </div>
          `;     
    }
    pokedex.innerHTML =  html;
    return html
    
}

async function nombre(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(pokemon => {
            return pokemon.json()})
        .then(data => {
            return data
        })

}

function verMas() {
    
}


async function findPokemon() { //async siempre devuelve una promesa
    console.log("Buscando Pokemon...");
    console.log(pokemon_name_input.value);
  
  
    let pokemon_name = pokemon_name_input.value.toLowerCase();
  
    let pokemon = await findPokemonByName(pokemon_name); //await es para el orden de llamado de función, espera que se ejecute la función antes de continuar, ya que estamos trabajando de manera asincrona
  
    console.log(pokemon);
  
    pokedex.innerHTML = `
    <div class="Content-ficha">
            <img class="Content-ficha-pokedex" src="./pokedezzzz.png">
            <img class="Content-ficha-img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
            <h3 class="Content-ficha-name">${pokemon.name}</h3>
            <p class="Content-ficha-mas" onclick="verMas()">ver mas</p>
            </div>
    `;
  }
  
  
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  
  async function findPokemonByName(pokemon_name) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
    let pokemon = await response.json()
  
    return pokemon
  }
  
  async function findPokemonByName(pokemon_name) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`) //petición es fetch
      .then (response => { //esto es una promesa
          return response.json()
      })
      .then(data => {
          return data
      })
  }