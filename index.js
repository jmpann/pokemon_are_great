
$(document).ready(addFormEventHandler)


function addFormEventHandler (){
  $('form#pokemon-form').submit(handleFormSubmit)
}

function handleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderPokemons()
}

function findAndRenderPokemons(){
  const BASEURL = 'http://pokeapi.co/api/v2/'
  const POKENAMEURL = 'http://pokeapi.co/api/v2/pokemon/'
  // find the user's search query and interpolate that into the URL
  //
let $pokeInput = $('input#pokemonInput')
//$ = create jquery object
let pokeName = $pokeInput.val().toLowerCase().replace(/^\s+|\s+$/g, '')

//.val() returns string of user input


  $.ajax({
    url: `${POKENAMEURL}${pokeName}`,
    success: renderPokemons
  })

  $.ajax({
    url: `https://en.wikipedia.org/w/api.php?action=query&titles=${pokeName}&prop=pageimages&format=json&pithumbsize=100`,
    dataType: 'JSONP',
    success: renderImage
  })
}

function renderImage(data) {
  let pokemonList = $('.js--poke-list')
  let lol = data.query.pages
  let key = Object.keys(lol)[0]
  let picUrl = data.query.pages[key].thumbnail.source
  pokemonList.html('')
  pokemonList.append(`<li class='collection-item'> <img src="${picUrl}"  </li>`)
}

function renderPokemons(pokemon){
  let pokemonList = $('.js--poke-list')
  let name = pokemon.name
  let height = pokemon.height
  let weight = pokemon.weight
  let abilities = pokemon.abilities.map(function(ability){
    return ability.ability.name
  })
  let formattedAbilities  = abilities.map(function(ability){
    return `${ability}</br>`
  })

  pokemonList.append(`<li class='collection-item'>Name: ${name}</li>`)
  pokemonList.append(`<li class='collection-item'>Height: ${height}</li>`)
  pokemonList.append(`<li class='collection-item'>Weight: ${weight}</li>`)
  pokemonList.append(`<li class='collection-item'>Abilities: ${formattedAbilities.join('&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;')}</li>`)
}


/* This is ian's code
function renderPokemons (data){
  // 2. When the response comes back, append some lis to my ul for the user
  let pokemonList = $('.js--poke-list')
  pokemonList.html('')

  function renderPokemon (  pokemon ) {
    let title = pokemon.volumeInfo.title
    pokemonList.append(`<li class='collection-item'>${title}</li>`)
  }

  data.items.forEach(renderPokemon)
}*/
