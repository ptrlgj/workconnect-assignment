import { createFormHook } from "@tanstack/react-form";

import { CheckboxField } from "@/components/form/checkbox-field";
import { ChipsField } from "@/components/form/chips-field";
import { SelectField } from "@/components/form/select-field";
import { SwitchField } from "@/components/form/switch-field";
import { TextField } from "@/components/form/text-field";
import { TextareaField } from "@/components/form/textarea-field";
import { fieldContext, formContext } from "@/hooks/form-context";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextareaField, SelectField, ChipsField, SwitchField, CheckboxField },
  formComponents: {},
});
