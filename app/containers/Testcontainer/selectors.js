import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the testcontainer state domain
 */

const selectTestcontainerDomain = state => state.testcontainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Testcontainer
 */

const makeSelectTestcontainer = () =>
  createSelector(selectTestcontainerDomain, substate => substate);

export default makeSelectTestcontainer;
export { selectTestcontainerDomain };
