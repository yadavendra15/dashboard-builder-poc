/**
 *
 * Asynchronously loads the component for Abc
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
