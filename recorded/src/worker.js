import Service from "./service.js";

const service = new Service();

console.log("I am alive");
postMessage("READY");
postMessage({ eventType: "alive" });

onmessage = ({ data }) => {
  const { query, file } = data;

  service.processFile({
    query,
    file,
    onOcurrenceUpdate: (args) => {
      postMessage({ eventType: "ocurrenceUpdate", ...args });
    },
    onProcess: (total) => {
      postMessage({ eventType: "progress", total });
    },
  });
};
