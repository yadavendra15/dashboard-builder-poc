/**
 *
 * Test
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Test() {
  return (
    <div>
      Hello World
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Test.propTypes = {};

export default memo(Test);
