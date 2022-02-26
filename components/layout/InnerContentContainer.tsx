import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';

interface InnerContentContainerProps {
  children: React.ReactNode;
}

export const InnerContentContainer: React.FunctionComponent<InnerContentContainerProps> = ({
  children,
}: InnerContentContainerProps) => {

  return (
    <Paper
      elevation={0} 
      sx={{
        marginTop: 2,
        marginBottom: 2
      }}
    >
      {children}
    </Paper>
  );
};
