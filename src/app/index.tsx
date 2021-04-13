/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import GameWrapper from './components/GameWrapper';

export function App() {
  return (
    <>
      <Helmet titleTemplate="Stick Defence" defaultTitle="Stick Defence">
        <meta name="description" content="My first try in making a game" />
      </Helmet>

      <GameWrapper />
    </>
  );
}
