import { atom } from "recoil";

export interface ITodo {
  id:number;
  text:string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

// atom을 위한 Setter 함수