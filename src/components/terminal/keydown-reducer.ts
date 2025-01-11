import type { CommandInvoker } from "./commands";

export type Keydown = 'Enter' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Backspace' | 'Home' | 'End' | 'Delete' | 'Letter';

export interface KeydownReducerState {
  prev: string;
  next: string;
  position: number;
  history: string[];
  historyIndex: number;
}

export interface KeydownReducerAction {
  type: Keydown;
  invoker?: CommandInvoker;
  letter?: string;
}

export function keydownReducer(
  state: KeydownReducerState,
  action: KeydownReducerAction,
): KeydownReducerState {
  switch(action.type) {
    case 'Enter': {
      const input = state.prev + state.next;

      if(input === 'clear') {
        return {
          prev: '',
          next: '',
          position: 0,
          history: [],
          historyIndex: 0,
        };
      }

      return {
        prev: '',
        next: '',
        position: 0,
        history: [...state.history, input],
        historyIndex: state.history.length + 1,
      };
    }
    case 'ArrowUp': {
      const index = Math.max(state.historyIndex - 1, 0);
      return {
        ...state,
        prev: state.history[index] || '',
        historyIndex: index,
      };
    }
    case 'ArrowDown': {
      const index = Math.min(state.historyIndex + 1, state.history.length);
      const input = state.history[index] || '';
      return {
        ...state,
        prev: input,
        next: '',
        position: input.length - 1,
        historyIndex: index,
      };
    }
    case 'ArrowLeft': {
      const position = Math.max(0, state.position - 1);
      return {
        ...state,
        prev: state.prev.slice(0, state.prev.length - 1),
        next: state.prev.slice(-1) + state.next,
        position,
      };
    }
    case 'ArrowRight': {
      const position = Math.min(state.prev.length + state.next.length - 1, state.position + 1);
      return {
        ...state,
        prev: state.prev + state.next.slice(0, 1),
        next: state.next.slice(1),
        position,
      };
    }
    case 'Backspace': {
      if(state.prev.length === 0) return state;
      return {
        ...state,
        prev: state.prev.slice(0, state.prev.length - 1),
        position: state.position - 1,
      };
    }
    case 'Home': {
      return {
        ...state,
        prev: '',
        next: state.prev + state.next,
        position: 0,
      };
    }
    case 'End': {
      return {
        ...state,
        prev: state.prev + state.next,
        next: '',
        position: state.prev.length + state.next.length - 1,
      };
    }
    case 'Delete': {
      if(state.next.length === 0) return state;
      return {
        ...state,
        next: state.next.slice(1),
      };
    }
    case 'Letter': {
      return {
        ...state,
        prev: state.prev + action.letter,
        position: state.position + 1,
      };
    }
    default: {
      return state;
    }
  }
}