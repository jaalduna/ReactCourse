import * as z from "zod/v4";
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

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem("tasks-state");

  const defaultState: TaskState = {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  };

  if (!localStorageState) {
    return defaultState;
  }

  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));

  if (result.error) {
    console.log(result.error);
    return defaultState;
  }

  return result.data;
};

export type TaskAction =
  | { type: "ADD-TODO"; payload: string }
  | { type: "TOGGLE-TODO"; payload: number }
  | { type: "DELETE-TODO"; payload: number };

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD-TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
        length: state.length + 1,
        completed: state.completed,
        pending: state.pending + 1,
      };
    }
    case "TOGGLE-TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });

      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }

    case "DELETE-TODO": {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );
      return {
        ...state,
        todos: updatedTodos,
        length: state.length - 1,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }

    default:
      return state;
  }
};
