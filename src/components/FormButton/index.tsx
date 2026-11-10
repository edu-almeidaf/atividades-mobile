import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native';

import { colors } from '../../theme';
import { styles } from './styles';

interface FormButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'outline' | 'danger';
  loading?: boolean;
}

export function FormButton({ title, variant = 'primary', loading = false, disabled, ...rest }: FormButtonProps) {
  const isDisabled = disabled || loading;
  const indicatorColor = variant === 'outline' ? colors.primary : colors.white;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator testID="button-loading" color={indicatorColor} />
      ) : (
        <Text style={[styles.text, variant === 'outline' && styles.textOutline]}>{title}</Text>
      )}
    </Pressable>
  );
}
