/**
 *
 * Asynchronously loads the component for Testcontainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
