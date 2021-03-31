/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import GameWrapper from './components/GameWrapper/GameWrapper';
import { useTranslation } from 'react-i18next';

export function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <Helmet
        titleTemplate="Stick Defence"
        defaultTitle="Stick Defence"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="My first try in making a game" />
      </Helmet>

      <GameWrapper />
    </>
  );
}
