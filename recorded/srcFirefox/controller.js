export default class Controller {
  #view;
  #worker;
  #service;
  #events = {
    alive: () => {
      console.log("alive Controller");
    },
    progress: ({ total }) => {
      this.#view.updateProgress(total);
    },
    ocurrenceUpdate: ({ found, linesLength, took }) => {
      const [[key, value]] = Object.entries(found);
      this.#view.updateDebugLog(
        `encontradas ${value} ocorrências de ${key} - 
        mais de ${linesLength} lines - 
        levou: ${took}`
      );
    },
  };
  constructor({ view, worker, service }) {
    this.#view = view;
    // this.#service = service;
    this.#worker = this.#configureWorker(worker);
  }

  static init(deps) {
    const controller = new Controller(deps);

    controller.init();
    return controller;
  }

  init() {
    this.#view.configureOnFileChange(this.#configureOnFileChange.bind(this));
    this.#view.configureOnFormSumit(this.#configureOnFormSumit.bind(this));
  }

  #configureWorker(worker) {
    worker.onmessage = ({ data }) => {
      if (data.eventType) {
        this.#events[data.eventType](data);
      }
    };

    return worker;
  }

  #formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB", "TB"];

    let i = 0;

    for (i; bytes > 1024 && i < 4; i++) {
      bytes /= 1024;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
  }

  #configureOnFileChange(file) {
    this.#view.setFileSize(this.#formatBytes(file.size));
    console.log("file", file);
  }

  #configureOnFormSumit({ description, file }) {
    const query = {};

    query["call description"] = new RegExp(description, "i");

    if (this.#view.isWorkerEnabled()) {
      console.log("execute worker theads");
      this.#worker.postMessage({ query, file });
      return;
    }

    console.log("execute principal theads");
alert('execute principal theads não implementado no firefox')
    // this.#service.processFile({
    //   query,
    //   file,
    //   onProcess: (total) => {
    //     this.#events.progress({total});
    //   },
    //   onOcurrenceUpdate: (...args) => {
    //     this.#events.ocurrenceUpdate(...args);
    //   },
    // });
  }
}
