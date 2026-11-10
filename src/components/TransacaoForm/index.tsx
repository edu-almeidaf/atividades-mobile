import { useState } from 'react';
import { ScrollView } from 'react-native';

import type { TransacaoInput } from '../../types/Transacao';
import { showAlert } from '../../utils/alert';
import { getErrorMessage } from '../../utils/errors';
import { parseValor } from '../../utils/format';
import { FormErrors, hasErrors, TransacaoFormValues, validateTransacao } from '../../utils/validation';
import { FormButton } from '../FormButton';
import { FormInput } from '../FormInput';
import { TipoSelector } from '../TipoSelector';
import { styles } from './styles';

interface TransacaoFormProps {
  initialValues?: TransacaoFormValues;
  submitLabel: string;
  onSubmit: (data: TransacaoInput) => Promise<void>;
}

const EMPTY_VALUES: TransacaoFormValues = { descricao: '', valor: '', tipo: null };

export function TransacaoForm({ initialValues = EMPTY_VALUES, submitLabel, onSubmit }: TransacaoFormProps) {
  const [values, setValues] = useState<TransacaoFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors<'descricao' | 'valor' | 'tipo'>>({});
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof TransacaoFormValues>(field: K, value: TransacaoFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit() {
    const validationErrors = validateTransacao(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors) || !values.tipo) return;

    setLoading(true);
    try {
      await onSubmit({
        descricao: values.descricao.trim(),
        valor: parseValor(values.valor),
        tipo: values.tipo,
      });
    } catch (error) {
      showAlert('Não foi possível salvar', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <FormInput
        label="Descrição"
        placeholder="Ex: Conta de luz"
        value={values.descricao}
        onChangeText={(text) => updateField('descricao', text)}
        error={errors.descricao}
        maxLength={100}
      />

      <FormInput
        label="Valor (R$)"
        placeholder="Ex: 149,90"
        keyboardType="decimal-pad"
        value={values.valor}
        onChangeText={(text) => updateField('valor', text)}
        error={errors.valor}
      />

      <TipoSelector value={values.tipo} onChange={(tipo) => updateField('tipo', tipo)} error={errors.tipo} />

      <FormButton title={submitLabel} loading={loading} onPress={handleSubmit} />
    </ScrollView>
  );
}
