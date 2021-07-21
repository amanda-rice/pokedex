import { ProxyState } from "../AppState.js"
import { myPokesService } from "../Services/MyPokesService.js"

function _drawAll() {
  const pokes = ProxyState.myPokes
  const activePoke = ProxyState.activePoke || {}
  let template = ''
  pokes.forEach(p => template += `<p class="action ${activePoke.id === p.id ? 'text-primary' : ''}" onclick="app.myPokesController.setPokemon('${p.id}')">${p.name}</p>`)
  if (!template) {
    template += '<p>No Caught Pokemon</p>'
  }
  document.getElementById("my-pokemon").innerHTML = template
}

export default class MyPokesController {
  constructor() {
    ProxyState.on('myPokes', _drawAll)
    _drawAll()
    this.getMyPokes()
  }
  async getMyPokes() {
    try {
      await myPokesService.getMyPokes()
    } catch (error) {
      console.error("Pokemon not gotten successfully", error)
    }
  }
  async addPokemon() {
    try {
      await myPokesService.addPokemon()
    } catch (error) {
      console.error("Pokemon not added successfully", error)
    }
  }
  setPokemon(id) {
    try {
      myPokesService.setPokemon(id)
    } catch (error) {
      console.error("Invalid id", error)
    }
  }
  async removePokemon() {
    try {
      await myPokesService.removePokemon()
    } catch (error) {
      console.error("Pokemon not removed successfully", error)
    }
  }

}