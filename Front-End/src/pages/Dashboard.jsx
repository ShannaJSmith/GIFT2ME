import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontawesome';
import './Dashboard.scss';

const theme = createTheme({
  palette: {
    cancel: {
      main: '#808080',
    },
  },
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [eventNames, setEventNames] = useState([]);
  const [show, setShow] = useState({});
  const [userName, setUserName] = useState('');

  // retrieve the token from local storage, if empty string, you need to logged in.
  const token = window.localStorage.getItem('token');

  // authenticates the user and gets their name to be displayed on the nav bar
  useEffect(() => {
    if (token) {
      const contents = JSON.parse(atob(token.split('.')[1]));
      setUserName(contents.first_name);
    }
  }, [token]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/events', { withCredentials: true })
      .then((res) => setEventNames(res.data));
  }, []);

  const handleDelete = (eventId) => {
    return axios
      .delete(`http://localhost:3001/api/events/${eventId}/delete`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('res:', res);
        const newEvents = [...eventNames];
        const index = eventNames.findIndex((event) => event.id === eventId);
        newEvents.splice(index, 1);
        setEventNames(newEvents);
      });
  };

  const handleShow = (eventId) => setShow({ ...show, [eventId]: true });
  const handleClose = (eventId) => setShow({ ...show, [eventId]: false });

  const create = () => {
    navigate('/events');
  };
  const edit = (id) => {
    navigate(`/events/${id}/edit`);
  };
  const invitationPage = (id) => {
    navigate(`/invitation/${id}`);
  };

  return (
    <>
      <div className="dashboard-container">
        <Navbar />
        <h1 className="title">My Dashboard</h1>

        <div className="create-event-btn">
          <Button variant="contained" onClick={create}>
            Create Event
          </Button>
        </div>

        <div className="event-container">
          <table>
            <thead id="no-border">
              <tr>
                <th>Events</th>
                <th>Share Wishlist</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {eventNames.map((event) => (
                <tr key={event.id}>
                  <td
                    className="invitation"
                    onClick={() => invitationPage(event.id)}
                  >
                    {event.event_name}
                  </td>
                  <td>
                    <a
                      id="share"
                      href={`mailto:?subject=${userName}'s Invitation&body=Hi%2C%0AI would like to invite you to my ${
                        event.event_name
                      } event on ${new Date(event.date).getDate()} / ${new Date(
                        event.date
                      ).getMonth()} / ${new Date(
                        event.date
                      ).getFullYear()} at ${
                        event.address
                      } %2C%0A here is my wishlist link :) http://localhost:3002/invitation/${
                        event.id
                      }`}
                    >
                      <FontAwesomeIcon icon={['fas', 'share-alt']} />
                    </a>
                  </td>
                  <td className="click edit" onClick={() => edit(event.id)}>
                    <FontAwesomeIcon icon={['fas', 'edit']} />
                  </td>
                  <td
                    className="click trash"
                    onClick={() => handleShow(event.id)}
                  >
                    <FontAwesomeIcon icon={['fas', 'trash']} />
                  </td>
                  {ReactDOM.createPortal(
                    <Modal show={show[event.id]}>
                      <Modal.Header
                        closeButton
                        onClick={() => handleClose(event.id)}
                      >
                        <Modal.Title>Delete Event</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p className="confirm-msg">
                          Are you sure you wish to delete this event?
                        </p>
                        <p className="delete-warning">
                          This action cannot be undone
                        </p>
                      </Modal.Body>

                      <Modal.Footer>
                        <div>
                          <ThemeProvider theme={theme}>
                            <Button
                              onClick={() => handleClose(event.id)}
                              variant="outlined"
                              color="cancel"
                            >
                              Cancel
                            </Button>
                          </ThemeProvider>
                        </div>
                        <Button
                          onClick={() => handleDelete(event.id)}
                          variant="outlined"
                          color="error"
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>,
                    document.body
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
