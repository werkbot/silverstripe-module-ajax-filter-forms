import { submitForm } from './submit-form';
import { FormConfig } from '../form-config';

export function initializeViewType(config: FormConfig) {
  const {
    ViewTypeField,
  } = config;

  if (!ViewTypeField) return;

  ViewTypeField.addEventListener('change', () => submitForm(config));
}

