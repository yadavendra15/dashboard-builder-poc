/**
 *
 * Testcontainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTestcontainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Testcontainer() {
  useInjectReducer({ key: 'testcontainer', reducer });
  useInjectSaga({ key: 'testcontainer', saga });

  return (
    <div>
      <Helmet>
        <title>Testcontainer</title>
        <meta name="description" content="Description of Testcontainer" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Testcontainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  testcontainer: makeSelectTestcontainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(Testcontainer);
