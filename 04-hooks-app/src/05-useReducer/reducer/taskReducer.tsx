interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD-TODO"; payload: string }
  | { type: "TOGGLE-TODO"; payload: number }
  | { type: "DELETE-TODO"; payload: number };

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  return state;
};
