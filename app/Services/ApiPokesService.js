import { ProxyState } from "../AppState.js"
import Poke from "../Models/Poke.js"
import { pokeApi } from "./AxiosService.js"

class ApiPokeService {
  async getPokemon(name) {
    let res = await pokeApi.get(name)
    console.log(res.data)
    ProxyState.activePoke = new Poke(res.data)
    console.log(ProxyState.activePoke)
  }
  async getAllPokes() {
    let res = await pokeApi.get()
    console.log(res.data.results)
    ProxyState.allApiPokes = res.data.results
    console.log(ProxyState.allApiPokes)
  }
}

export const apiPokesService = new ApiPokeService()