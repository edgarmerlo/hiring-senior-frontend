import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import ListItemButton from '@mui/material/ListItemButton';
import { useRouter } from 'next/router';

interface InvoicesListProps {
  invoices: {
    concept: string,
    id: string,
  }[] | [],
  Icon?: React.FunctionComponent,
  fields: {key: string, label: string}[],
  linkKey?: string
}

export const InvoicesList: React.FunctionComponent<InvoicesListProps> = ({
  invoices = [],
  Icon = InboxIcon,
  fields = [],
  linkKey
}: InvoicesListProps) => {
  const router = useRouter();
  return (
    <>
      {invoices.length > 0 ?
        <List sx={{ width: '100%' }}>
          {invoices.map(invoice => (
            <>
              <ListItem alignItems="flex-start" >
                <ListItemButton onClick={() => linkKey ? router.push(`/invoice/${invoice[linkKey]}`) : ''}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  {fields.map((field, index) => (
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <strong>
                            {field.label}: 
                          </strong>
                          {invoice[field.key]}
                        </React.Fragment>
                      }
                    />
                  ))}
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      : 'No invoices saved' }
    </>
  );
}
