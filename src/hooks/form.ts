import { createFormHook } from "@tanstack/react-form";

import { CheckboxField } from "@/components/form/CheckboxField";
import { ChipsField } from "@/components/form/ChipsField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextField } from "@/components/form/TextField";
import { TextareaField } from "@/components/form/TextareaField";
import { fieldContext, formContext } from "@/hooks/form-context";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextareaField, SelectField, ChipsField, SwitchField, CheckboxField },
  formComponents: {},
});
