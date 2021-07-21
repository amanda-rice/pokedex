import { ProxyState } from "../AppState.js";
import { apiPokesService } from "../Services/ApiPokesService.js";

function _drawAll() {
  const pokes = ProxyState.allApiPokes
  let template = ''
  pokes.forEach(p => template += `<p class="action" onclick="app.apiPokesController.getPokemon('${p.url}')">${p.name}</p>`)
  document.getElementById('api-pokes').innerHTML = template
}

function _drawActivePokemon() {
  if (!ProxyState.activePoke) {
    console.log('No ProxyState selected-poke')
    document.getElementById('selected-poke').innerHTML = `<div class="text-center">No Active Pokemon</div>`
    return
  }
  document.getElementById('selected-poke').innerHTML = ProxyState.activePoke.Template
}

export default class ApiPokesController {
  constructor() {
    ProxyState.on('allApiPokes', _drawAll)
    ProxyState.on('activePoke', _drawActivePokemon)
    this.getAllPokes()
    _drawActivePokemon()
  }
  async getAllPokes() {
    try {
      await apiPokesService.getAllPokes()
    } catch (error) {
      console.error('An error occurred trying to access the Pokemon api')
    }
  }
  async getPokemon(url) {
    try {
      await apiPokesService.getPokemon(url)
    } catch (error) {
      console.error("unable to get pokemon")
    }
  }
}