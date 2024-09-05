import { IUserTimePreferences } from "../user";

const key = 'TIME_PREFERENCES';
const defaultPrefs = {
  workTime: 25,
  shortRestTime: 5,
  longRestTime: 15,
}

export function setDefaultPrefLocalStorage() {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultPrefs));
  }
}


export function getLocalStoragePreferences(): IUserTimePreferences {
  const tasks = localStorage.getItem(key);
  return tasks ? JSON.parse(tasks) : defaultPrefs;
}

export function updateLocalStoragePreferences(newPrefObj: IUserTimePreferences) {
  localStorage.setItem(key, JSON.stringify(newPrefObj));
}
