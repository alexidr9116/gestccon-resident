import { store } from "../../store/store";

export function addNewOccurence(occurrence) {
  store.update((store) => {
    store.occurences.push(occurrence);
  });
}

export function updateOccurence(id, data) {
  store.update((store) => {
    const index = store.occurences.findIndex((x) => x.id === id);
    store.occurences[index] = { ...store.occurences[index], ...data };
  });
}

export function deleteOccurence(id) {
  store.update(store => {
    const newOccurencesList = store.occurences.filter((e) => e.id !== id);
    store.occurences = newOccurencesList;
  })
}
