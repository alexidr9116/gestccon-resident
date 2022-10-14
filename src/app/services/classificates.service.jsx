import { store } from '../../store/store';

export function addClassificate(classificate) {
  store.update(state => {
    state.classificates.push(classificate)
  })
  return classificate
}
