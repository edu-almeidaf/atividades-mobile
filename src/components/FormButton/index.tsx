import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';

import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../theme/colors';

interface FormButtonProps extends PressableProps {
  title: string;
}

export function FormButton({ title, disabled, ...rest }: FormButtonProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: disabled ? colors.primaryDisabled : colors.primary },
        pressed && !disabled && styles.buttonPressed,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.buttonText, { color: disabled ? colors.buttonTextDisabled : colors.buttonText }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
