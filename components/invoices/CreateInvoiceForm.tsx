import React, { useState, useEffect }  from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { databaseService } from 'services/databaseService';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { InnerContentContainer } from 'components/layout/InnerContentContainer';
import { currencyService } from 'services/currencyService';
import { useRouter } from 'next/router';

interface Inputs {
  [key: string]: string,
};

const currency = new currencyService();

const CreateInvoiceForm: React.FunctionComponent = () => {
  const [amountOfItems, setAmountOfItems] = useState(0);
  const router = useRouter();
  const { register, watch, control, handleSubmit, formState: { errors } } = useForm<Inputs>(
  );
  const { remove } = useFieldArray({
    control,
    name: 'item',
  });
  const watchItems = watch('item');
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if(data.item.length <= 0) {
      return false;
    }
    const invoice = await databaseService.saveInvoice({ ...data, total: currency.getTotalFromItems(watchItems).MXN});
    router.push(`/invoice/${invoice}`)
  }

  const addItem = (amount: number) => {
    setAmountOfItems(amount);
  }
  const removeItem = (amount: number) => {
    setAmountOfItems(amount);
    remove(amount)
  }

  
  useEffect(() => {
    async function init(): Promise<void> {
      await currency.initialize();
    }
    init();
  }, []);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={Boolean(errors.concept)}
        id="standard-error-helper-text"
        label="Concept"
        helperText={errors.concept?.message}
        variant="standard"
        required
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
              label="Item name"
              helperText={errors[`item-${index + 1}-name`]?.message}
              variant="standard"
              key={`name-${index + 1}`}
              required
              {...register(`item.${index}.name`)}
            />
            <TextField
              fullWidth
              label="Item description"
              variant="standard"
              key={`description-${index + 1}`}
              required
              {...register(`item.${ index}.description`)}
            />
          </InnerContentContainer>
          <InnerContentContainer>
            <TextField
              type="number"
              label="Amount"
              variant="standard"
              key={`amount-${index + 1}`}
              required
              {...register(`item.${index}.amount`)}
            />
            <TextField
              label="Currency"
              variant="standard"
              aria-readonly
              value="MXN"
              key={`currency-${index + 1}`}
              {...register(`item.${index}.currency`)}
            />
          </InnerContentContainer>
        </div>
      ))}
      <InnerContentContainer>        
        {
          currency.currencyData &&
          <>
            Total MXN: {currency.getTotalFromItems(watchItems).MXN}<br />
            Total USD: {currency.getTotalFromItems(watchItems).USD}
          </>
        }
      </InnerContentContainer>
      <InnerContentContainer>
        <Button variant="contained" type="submit">Save</Button>
      </InnerContentContainer>
    </form>
  );
}

export default CreateInvoiceForm;
