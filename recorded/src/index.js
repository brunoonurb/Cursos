import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";




// worker module so funciona no chrome por enquanto
// ou seja worker funciona mas -import/export não
const worker = new Worker("./src/worker.js", {
  type: "module",
});

Controller.init({
  view: new View(),
  worker,
  service: new Service()
});
