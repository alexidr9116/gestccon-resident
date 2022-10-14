import { store } from "../../store/store";

export function addAnimal(animal) {
  store.update((store) => {
    store.animals.push(animal);
  });
}

export function updateAnimal(id, data) {
  store.update((store) => {
    const index = store.animals.findIndex((x) => x.id === id);
    store.animals[index] = { ...store.animals[index], ...data };
  });
}

export function deleteAnimal(id) {
  store.update(store => {
    const newAnimals = store.animals.filter((e) => e.id !== id);
    console.log({newAnimals})
    store.animals = newAnimals;
  })
}
