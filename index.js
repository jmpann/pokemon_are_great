
$(document).ready(addNameFormEventHandler)
$(document).ready(addTypeFormEventHandler)


function addNameFormEventHandler (){
  $('form#pokemon-form').submit(nameHandleFormSubmit)
}
function addTypeFormEventHandler (){
  $('form#type-form').submit(typeHandleFormSubmit)
}


function nameHandleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderPokemons()
}
function typeHandleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderPokemonsByType()
}


function findAndRenderPokemonsByType(){
  const POKETYPEURL = 'http://pokeapi.co/api/v2/type/'

  let $pokeInputType = $('input#pokemonType')
  const pokeType = $pokeInputType.val()
  $("#pokeimage").html("")
  $("#pokemonlist").html("")
  $("#poketypelist").html("")

  $.ajax({
    url: `${POKETYPEURL}${pokeType}/`,
    success: renderPokemonsByType

  })
}


function findAndRenderPokemons(){
  const BASEURL = 'http://pokeapi.co/api/v2/'
  const POKENAMEURL = 'http://pokeapi.co/api/v2/pokemon/'
  $("#pokeimage").html("")
  $("#pokemonlist").html("")
  $("#poketypelist").html("")
  let $pokeInput = $('input#pokemonInput')
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
  let pokemonImage = $('.js--poke-image')
  let lol = data.query.pages
  let key = Object.keys(lol)[0]
  let picUrl = data.query.pages[key].thumbnail.source
  pokemonImage.html('')
  var elem = document.createElement("img");
  elem.src = `${picUrl}`;
  elem.setAttribute("height", "200");
  elem.setAttribute("width", "200");
  elem.setAttribute("alt", "Flower");
  document.getElementById("pokeimage").appendChild(elem);
  }

function renderPokemons(pokemon){
  let pokemonList = $('.js--onepoke-list')
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

function renderPokemonsByType(data){
  let pokemonList = $('.js--poketype-list')
  pokemonList.html('')
  let pokemonsObjectArray = data.pokemon
  let pokeDoubleDmgTo = data.damage_relations.double_damage_to.map(function(placeholder){return placeholder.name})
  let pokeDoubleDmgFrom = data.damage_relations.double_damage_from.map(function(placeholder){return placeholder.name})
  let pokeHalfDmgTo = data.damage_relations.half_damage_to.map(function(placeholder){return placeholder.name})
  let pokeTypeMoves = data.moves.map(function(placeholder){return placeholder.name})
  let pokemonNameArray = pokemonsObjectArray.map(function(data){
    return capitalizeFirstLetter(data.pokemon.name)
  })
  let formattedPokeNameArray = pokemonNameArray.join(",&#160;")
  pokemonList.append(`<li class ='collection-item'>Does Double Damage To These Types: ${pokeDoubleDmgTo.join(',&#160;')} </li> `)
  pokemonList.append(`<li class ='collection-item'>Does Half Damage To These Types: ${pokeDoubleDmgFrom.join(',&#160;')} </li> `)
  pokemonList.append(`<li class ='collection-item'>Takes Double Damage From These Types: ${pokeDoubleDmgFrom.join(',&#160;')} </li> `)
  pokemonList.append(`<li class ='collection-item'> Moves: ${pokeTypeMoves.join(',&#160;')}`)
  pokemonList.append(`<li class ='collection-item'> Pokemon: ${formattedPokeNameArray}`)

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
