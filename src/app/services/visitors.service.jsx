import { store } from "../../store/store";

export const addNewVisitor = (data) => {
  store.update((state) => {
    state.visitors.push(data);
  });
  return data;
};

export const updateVisitor = (id, data) => {
  store.update((store) => {
    const index = store.visitors.findIndex((x) => x.id === Number(id));
    store.visitors[index] = { ...store.visitors[index], ...data };
  });
};

export const revokeAuthorization = (id) => {
  store.update((store) => {
    const newVisitors = store.visitors.filter((e) => e.id !== id);
    store.visitors = newVisitors;
  });
};
