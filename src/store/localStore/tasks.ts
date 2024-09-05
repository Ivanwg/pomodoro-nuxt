import {TTasksList, ITaskObj} from '../tasks';
const key = 'POMODORO_TASKS';


export function setDefaultTaskLocalStorage() {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }
}

export function getLocalStorageTasks(): TTasksList {
  const tasks = localStorage.getItem(key);
  return tasks ? JSON.parse(tasks) : [];
}

export function appendLocalStorageTask(newTask: ITaskObj) {
  const tasks = getLocalStorageTasks();
  tasks.push(newTask);
  updateLocalStorageTasks(tasks);
}

export function updateLocalStorageTasks(tasks: TTasksList) {
  localStorage.setItem(key, JSON.stringify(tasks));
}
