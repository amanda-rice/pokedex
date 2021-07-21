import { ProxyState } from "../AppState.js"
import Poke from "../Models/Poke.js"
import { sandbox } from "./AxiosService.js"


class MyPokesService {
  async getMyPokes() {
    const res = await sandbox.get()
    ProxyState.myPokes = res.data.map(p => new Poke(p))
  }
  async addPokemon() {
    const res = await sandbox.post('', ProxyState.activePoke)
    console.log(res.data)
    const newPokemon = new Poke(res.data)
    ProxyState.myPokes = [...ProxyState.myPokes, newPokemon]
    ProxyState.activePoke = newPokemon
  }
  setPokemon(id) {
    const pokemon = ProxyState.myPokes.find(p => p.id === id)
    console.log(pokemon)
    if (!pokemon) {
      throw new Error("invalid pokemon id")
    }
    ProxyState.activePoke = pokemon
    ProxyState.myPokes = ProxyState.myPokes
  }
  async removePokemon() {
    const res = await sandbox.delete(ProxyState.activePoke.id)
    ProxyState.myPokes = ProxyState.myPokes.filter(p => p.id != ProxyState.activePoke.id)
    ProxyState.activePoke = null
  }
}
export const myPokesService = new MyPokesService()