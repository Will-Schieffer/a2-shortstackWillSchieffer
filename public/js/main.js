// FRONT-END (CLIENT) JAVASCRIPT HERE
const form = document.querySelector( '#recipeForm' )
const list = document.querySelector( '#recipeList' )

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const titleInput = document.querySelector( '#title' )
  const urlInput = document.querySelector( '#url' )

  const recipe = {
    title: titleInput.value,
    url: urlInput.value
  }

  const response = await fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( recipe )
  })

  const recipes = await response.json()

  renderRecipes( recipes )
}

const renderRecipes = function( recipes ) {
  const list = document.querySelector( '#recipeList' )

  list.innerHTML = ''

  recipes.forEach( function( recipe ) {
    const li = document.createElement( 'li' )

    const a = document.createElement( 'a' )
    a.href = recipe.url
    a.target = '_blank'
    a.textContent = recipe.title

    li.appendChild( a )
    list.appendChild( li )
  })
}

window.onload = function() {
  const button = document.querySelector('button')
  button.onclick = submit
}