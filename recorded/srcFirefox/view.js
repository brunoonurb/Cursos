export default class View {
  #csvFile = document.querySelector("#csv-file");
  #fileSize = document.querySelector("#file-size");
  #form = document.querySelector("#form");
  #debug = document.querySelector("#debug");
  #progress = document.querySelector("#progress");
  #worker = document.querySelector("#worker");

  setFileSize(size) {
    this.#fileSize.innerText = `File size: ${size} \n`;
  }

  configureOnFileChange(fn) {
    this.#csvFile.addEventListener("change", (e) => {
      fn(e.target.files[0]);
    });
  }

  configureOnFormSumit(fn) {
    this.#form.reset();
    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("e", e);
      const file = this.#csvFile.files[0];

      //isso deveria esta no controller
      if (!file) {
        alert("Por favor selecione o arquivo");
      }

      const form = new FormData(e.currentTarget);
      const description = form.get("description");
      fn({ description, file });
      this.updateDebugLog("");
    });
  }

  updateDebugLog(text, reset = true) {
    if (reset) {
      this.#debug.innerText = text;
      return;
    }
    this.#debug.innerHTML += text;
  }

  updateProgress(value) {
    this.#progress.value = value;
  }

  isWorkerEnabled() {
    return this.#worker.checked;
  }
}
