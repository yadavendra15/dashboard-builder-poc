/**
 *
 * Abc
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Abc() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Abc.propTypes = {};

export default memo(Abc);
