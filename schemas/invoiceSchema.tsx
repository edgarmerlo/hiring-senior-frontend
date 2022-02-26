import * as z from 'zod';

export interface InvoiceForm extends z.ZodRawShape {
  concept: z.ZodString;
}

export const invoiceFormRules = (
  errorMessages: { [key: string]: string },
  items: number
): InvoiceForm => {
  const dynamicItemsValidation: { [key: string]: any } = {};
  for(let i = 1; i <= items; i++) {
    dynamicItemsValidation[`item-${i}-name`] = z.string()
      .nonempty({ message: errorMessages.required })
      .max(35, { message: errorMessages.max })
    dynamicItemsValidation[`item-${i}-description`] = z.string()
      .nonempty({ message: errorMessages.required })
      .max(35, { message: errorMessages.max })
    dynamicItemsValidation[`item-${i}-amount`] = z.string()
      .nonempty({ message: errorMessages.required })
      .max(35, { message: errorMessages.max })
  }
  return {
    concept: z
      .string()
      .nonempty({ message: errorMessages.required })
      .max(35, { message: errorMessages.max }),
    ...dynamicItemsValidation
  };
};

export const invoiceSchema = (items: number): z.ZodObject<InvoiceForm> => {
  const errorMessages = {
    default: 'Required field',
    required: 'Required field',
    max: 'Extension error',
  };

  return z.object(invoiceFormRules(errorMessages, items));
};
