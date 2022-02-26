import React, { useState }  from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema } from 'schemas/invoiceSchema';
import { databaseService } from 'services/databaseService';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { InnerContentContainer } from 'components/layout/InnerContentContainer';
import { currencyService } from 'services/currencyService';

interface Inputs {
  [key: string]: string,
};

export default function CreateInvoiceForm() {
  const [amountOfItems, setAmountOfItems] = useState(0);

  const { register, watch, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(invoiceSchema(amountOfItems))
    }
  );
  const watchItems = watch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, 'TOSAVE')
    databaseService.saveInvoice(data);
  }

  const addItem = (amount: number) => {
    setAmountOfItems(amount);
  }

  const removeItem = (amount: number) => {
    setAmountOfItems(amount);
  }

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={Boolean(errors.concept)}
        id="standard-error-helper-text"
        label="Concept"
        helperText={errors.concept?.message}
        variant="standard"
        {...register("concept")}
      />
      <InnerContentContainer>
        <Button variant="contained" onClick={() => addItem(amountOfItems + 1)}>Add item</Button>
        {amountOfItems > 0 && <Button variant="contained" onClick={() => removeItem(amountOfItems - 1)}>Remove Item</Button>}
      </InnerContentContainer>
      
      {new Array(amountOfItems).fill(0).map((field, index) => (
        <div key={index}>
          <Typography variant="h6" sx={{marginTop: 3}}>
            Line item
          </Typography>
          <InnerContentContainer>
            <TextField
              fullWidth
              error={Boolean(errors[`item-${index + 1}-name`])}
              label="Item name"
              helperText={errors[`item-${index + 1}-name`]?.message}
              variant="standard"
              key={`name-${index + 1}`}
              {...register(`item-${index + 1}-name`)}
            />
            <TextField
              fullWidth
              error={Boolean(errors[`item-${index + 1}-description`])}
              label="Item description"
              helperText={errors[`item-${index + 1}-description`]?.message}
              variant="standard"
              key={`description-${index + 1}`}
              {...register(`item-${ index + 1}-description`)}
            />
          </InnerContentContainer>
          <InnerContentContainer>
            <TextField
              type="number"
              error={Boolean(errors[`item-${index + 1}-amount`])}
              label="Amount"
              helperText={errors[`item-${index + 1}-amount`]?.message}
              variant="standard"
              key={`amount-${index + 1}`}
              {...register(`item-${index + 1}-amount`)}
            />
            <TextField
              label="Currency"
              variant="standard"
              aria-readonly
              value="MXN"
              key={`currency-${index + 1}`}
              {...register(`item-${index + 1}-currency`)}
            />
          </InnerContentContainer>
        </div>
      ))}
      <InnerContentContainer>
        {console.log(watchItems, errors, 'WATCHE')}
        {/* Total: {currencyService.getTotalFromItems(watchItems)} */}
      </InnerContentContainer>
      <InnerContentContainer>
        <Button variant="contained" type="submit">Save</Button>
      </InnerContentContainer>
    </form>
  );
}
