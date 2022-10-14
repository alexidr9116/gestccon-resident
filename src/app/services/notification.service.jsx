import { store } from "../../store/store";

export function showNotification(props) {
  store.update((state) => {
    state.ui.notificationBar = { ...state.ui.notificationBar, ...props };
  });
  window.notification("notification-14");
}
