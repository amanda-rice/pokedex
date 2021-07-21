import { ProxyState } from "../AppState.js";

export default class Poke {
  constructor({ name, img, weight, height, types, id, forms }) {
    this.name = name || forms.name
    this.img = img || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    this.weight = weight
    this.height = height
    this.types = types
    this.id = id
    this.isMyPokemon = forms == undefined
    console.log("types[0]", this.types[0].type.name)
  }
  get Template() {
    return `
      <div class="bg-light m-3 p-3">
        <div>
          <img class="p-2" src="${this.img}" alt="${this.name} Picture">
        </div>
          <div>
              <h2 >${this.name.toUpperCase()}</h2>
              <p>Weight: ${this.weight}</p>
              <p>Height: ${this.height}</p>
              <p>Types:</p>
              ${this.allTypes}
          </div>
          <div class="text-right">
             ${this.drawButtons}
          </div>
      </div>
    `
  }
  get allTypes() {
    if (this.types == undefined) {
      return
    }
    let template = ``
    for (let elem in this.types) {
      template += `<li>${this.types[elem].type.name}</li>`
    }
    return template
  }
  get drawButtons() {
    if (this.isMyPokemon) {
      return `<button type="button" class="btn btn-secondary" onclick="app.myPokesController.removePokemon()">Remove Pokemon</button>`
    }
    return `<button type="button" class="btn btn-warning" onclick="app.myPokesController.addPokemon()">Add Pokemon</button>`
  }
}