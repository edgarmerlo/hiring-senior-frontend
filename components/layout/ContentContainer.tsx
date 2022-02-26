import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';

interface ContentContainerProps {
  children: React.ReactNode;
}

export const ContentContainer: React.FunctionComponent<ContentContainerProps> = ({
  children,
}: ContentContainerProps) => {

  return (
    <Paper
      elevation={2} 
      sx={{
        margin: 4,
        padding: 4
      }}
    >
      {children}
    </Paper>
  );
};
