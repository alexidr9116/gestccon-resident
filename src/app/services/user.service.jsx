import { store} from "../../store/store";

export function updateUser(user) {
  store.update((state) => {
    state.user = user;
  });
}
