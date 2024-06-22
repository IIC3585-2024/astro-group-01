import { writable } from "svelte/store";

const ratingStore = writable({});

const agregar = (key, value) => {
  ratingStore.update((dict) => {
    dict[key] = value;
    return dict;
  });
};

const existe = (key) => {
  let exists;
  ratingStore.subscribe((dict) => {
    exists = dict.hasOwnProperty(key);
  })();
  return exists;
};

const actualizarValor = (key, newValue) => {
  ratingStore.update((dict) => {
    if (dict.hasOwnProperty(key)) {
      dict[key] = newValue;
    }
    return dict;
  });
};

const obtenerValor = (key) => {
  let value;
  ratingStore.subscribe((dict) => {
    value = dict[key];
  })();
  return value;
};

export { ratingStore, agregar, existe, actualizarValor, obtenerValor };
