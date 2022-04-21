/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from '../../global-styles';
import Test from '../../components/Test';
import Abc from '../../components/Abc';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Abc />} />
            <Route path="/apps" element={<Test />} />
          </Routes>
        </BrowserRouter>
      <GlobalStyle />
    </AppWrapper>
  );
}
