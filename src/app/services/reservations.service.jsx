import { store } from "../../store/store";
import { faker } from "@faker-js/faker";
import { addDays, format } from "date-fns";

export function addGuest(reservationId, guest) {
  store.update((state) => {
    const reservationIndex = state.ambients.findIndex(
      (e) => e.id === Number(reservationId)
    );
    state.ambients[reservationIndex].guests?.push(guest);
  });
}

export function removeGuest(reservationId, guest) {
  store.update((state) => {
    const reservationIndex = state.ambients.findIndex(
      (e) => e.id === Number(reservationId)
    );

    const guestsFiltered = state.ambients[reservationIndex].guests?.filter(
      (e) => e.id !== guest.id
    );
    state.ambients[reservationIndex].guests = guestsFiltered;
  });
}

export function setGuestEmail(reservationId, guest) {}

export function addReservation(data, ambientId) {
  store.update((state) => {
    const ambientIndex = state.ambients.findIndex((e) => e.id === ambientId);
    state.ambients[ambientIndex].reservations?.push(data);
  });
}

export function cancelReservation(reservationId, ambientId) {
  store.update((state) => {
    const ambientIndex = state.ambients.findIndex((e) => e.id === ambientId);
    const reservationsFiltered = state.ambients[
      ambientIndex
    ].reservations?.filter((reservation) => reservation.id !== reservationId);
    state.ambients[ambientIndex].reservations = reservationsFiltered;
  });
}
