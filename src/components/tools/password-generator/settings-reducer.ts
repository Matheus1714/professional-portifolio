export interface SettingsReducerState {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export type SettingsType = 'uppercase' | 'lowercase' | 'numbers' | 'symbols' | 'length';

export interface SettingsReducerAction {
  type: SettingsType;
  value: boolean | number | string;
}

export function settingsReducer(
  state: SettingsReducerState,
  action: SettingsReducerAction,
) {
  switch (action.type) {
    case 'uppercase':
    case 'lowercase':
    case 'numbers':
    case 'symbols':
      return {
        ...state,
        [action.type]: Boolean(action.value),
      };
    case 'length':
      const length = Number(action.value);
      return {
        ...state,
        length: length > 50 ? 50 : length,
      };
  }
}