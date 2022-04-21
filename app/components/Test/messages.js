/*
 * Test Messages
 *
 * This contains all the text for the Test component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Test';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Test component!',
  },
});
