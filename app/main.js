import MyPokesController from "./Controllers/MyPokesController.js";
import ApiPokesController from "./Controllers/ApiPokesController.js";


class App {
  apiPokesController = new ApiPokesController()
  myPokesController = new MyPokesController()
}

window["app"] = new App();
