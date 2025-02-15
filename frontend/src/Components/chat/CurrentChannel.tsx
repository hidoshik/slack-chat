import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import { Col } from 'react-bootstrap';
import filter from 'leo-profanity';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { setMessages } from '../../slices/messagesSlice.js';
import { channelsState } from '../../slices/channelsSlice.js';
import { messagesList } from '../../slices/messagesSlice.js';

type CurrentChannelParams = {
  selectedChannel: string;
};

type FormValues = {
  message: string;
};

const CurrentChannel = (params: CurrentChannelParams) => {
  const { selectedChannel } = params;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  filter.loadDictionary('ru');
  filter.loadDictionary('en');

  const inputEl = useRef<HTMLInputElement>(null);
  const { messages } = useSelector(messagesList);
  const { channels, currentChannel } = useSelector(channelsState);

  const channel = channels.find((channel) => channel.name === selectedChannel);
  const channelId = channel?.id;

  const currentMessages = messages.filter((message) => message.channelId === channelId);
  const currentMessagesCount = currentMessages.length;

  const token = window.localStorage.getItem('token');
  const username = window.localStorage.getItem('username');

  useEffect(() => {
    inputEl.current?.focus();
  }, [currentChannel]);

  useEffect(() => {
    try {
      axios
        .get('/api/v1/messages', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          dispatch(setMessages(response.data));
        });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, token]);

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const newMessage = { body: filter.clean(values.message), channelId, username };

    try {
      axios
        .post('/api/v1/messages', newMessage, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => actions.resetForm({ values: { message: '' } }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{username}</b>
          </p>
          <span className="text-muted">
            <Trans i18nKey="messages_count" values={{ count: currentMessagesCount }}>
              {{ currentMessagesCount }} сообщений
            </Trans>
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.length > 0 &&
            currentMessages.map(({ username, body, id }) => {
              return (
                <div key={id} className="text-break mb-2">
                  <b>{username}</b>
                  {`: ${body}`}
                </div>
              );
            })}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik initialValues={{ message: '' }} onSubmit={handleSubmit}>
            <Form className="py-1 border rounded-2">
              <div className="input-group">
                <Field
                  name="message"
                  aria-label={t('new_message')}
                  placeholder={t('enter_message')}
                  className="border-0 p-0 ps-2 form-control"
                  innerRef={inputEl}
                />
                <button type="submit" className="btn btn-group-vertical">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                  </svg>
                  <span className="visually-hidden">{t('send')}</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Col>
  );
};

export default CurrentChannel;
