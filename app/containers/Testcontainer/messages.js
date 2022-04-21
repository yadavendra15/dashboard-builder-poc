/*
 * Testcontainer Messages
 *
 * This contains all the text for the Testcontainer container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Testcontainer';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Testcontainer container!',
  },
});
