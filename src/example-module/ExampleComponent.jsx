/* **************************************************************
 *
 * Copyright (C) 2020 Acoustic, L.P. All rights reserved.
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *
 *************************************************************** */

import React from 'react';
import { Button, FullPageTemplate, HR, H2, H3, UnorderedList, ListItem } from '@decibel/components';
import { useDispatch, useSelector } from 'react-redux';
import { useStatusMessages, useDispatchRequest } from '@cui/shell-ui';
import { actions } from './reducers';
import { useLogger } from '../example-logger/ExampleLogger';
import useTranslation from '../i18n';
import { EXAMPLE_URL } from './epics';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const log = useLogger('ExampleComponent');
  const { showSuccessMessage } = useStatusMessages();

  const { fetch } = useDispatchRequest(
    {
      url: EXAMPLE_URL,
      successType: actions.successRequest.type,
    },
    { trigger: false },
  );
  const onPingClickHandler = () => {
    log.info('ping');
    showSuccessMessage({ messageContent: 'PING message' });
    dispatch(actions.ping());
  };

  const onRequestClickHandler = () => {
    fetch();
  };

  const isPinging = !!useSelector(state => state.pingReducer.isPinging);

  return (
    <FullPageTemplate header="Home Page">
      <H2>PING / PONG example</H2>
      <H3>{`is pinging: ${isPinging.toString()}`}</H3>
      <Button type="button" onClick={onPingClickHandler}>
        Start PING
      </Button>
      <Button type="button" onClick={onRequestClickHandler}>
        Just make a request
      </Button>
      <HR />
      <H2>Translation example</H2>
      <UnorderedList nested>
        <ListItem>{t('Hello {{name}}', { name: 'DynamicUserName' })}</ListItem>
        <ListItem>{t('Sample text')}</ListItem>
        <ListItem>{t('Not translated text (missing translation)')}</ListItem>
      </UnorderedList>
    </FullPageTemplate>
  );
};
