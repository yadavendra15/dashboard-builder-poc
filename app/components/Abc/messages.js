/*
 * Abc Messages
 *
 * This contains all the text for the Abc component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Abc';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Abc component!',
  },
});
