import Controller from "./controller.js";
import View from "./view.js";
// import Service from "./service.js";
// importScripts("./service.js")



// worker module so funciona no chrome por enquanto
// ou seja worker funciona mas -import/export não
const worker = new Worker("./srcFirefox/worker.js"
// , {
//   type: "module",
// }
);

Controller.init({
  view: new View(),
  worker,
  // service: new Service()
});
