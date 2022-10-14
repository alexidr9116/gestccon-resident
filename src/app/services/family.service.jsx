import { store } from "../../store/store";

export function addFamilyMeber(memberFamily) {
  store.update((store) => {
    store.family.push(memberFamily);
  });
}

export function updateFamilyMeber(id, data) {
  store.update((store) => {
    const index = store.family.findIndex((x) => x.id === id);
    store.family[index] = { ...store.family[index], ...data };
  });
}

export function deleteFamilyMeber(id) {
  store.update(store => {
    const newFamilyList = store.family.filter((e) => e.id !== id);
    store.family = newFamilyList;
  })
}
