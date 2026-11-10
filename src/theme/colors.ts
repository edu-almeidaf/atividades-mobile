export type Theme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  placeholder: string;
  primary: string;
  primaryDisabled: string;
  buttonText: string;
  buttonTextDisabled: string;
  error: string;
}

export const Colors: Record<Theme, ThemeColors> = {
  light: {
    background: '#FFFFFF',
    surface: '#FAFAFA',
    text: '#1B1B1B',
    textMuted: '#666666',
    border: '#CCCCCC',
    placeholder: '#999999',
    primary: '#2E7D32',
    primaryDisabled: '#A5D6A7',
    buttonText: '#FFFFFF',
    buttonTextDisabled: '#FFFFFF',
    error: '#E53935',
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textMuted: '#AAAAAA',
    border: '#3A3A3A',
    placeholder: '#777777',
    primary: '#66BB6A',
    primaryDisabled: '#2F4F31',
    buttonText: '#0B1F0C',
    buttonTextDisabled: '#8FA990',
    error: '#EF5350',
  },
};
