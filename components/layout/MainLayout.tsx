import React from 'react';
import Header from 'components/layout/Header';
import Typography from '@mui/material/Typography';
import { ContentContainer } from 'components/layout/ContentContainer';

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string
}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  children,
  pageTitle
}: MainLayoutProps) => {

  return (
    <>
      <Header></Header>
      <ContentContainer>
        <Typography variant="h4" component="div" gutterBottom>
          {pageTitle}
        </Typography>
        {children}
      </ContentContainer>
    </>
  );
};
