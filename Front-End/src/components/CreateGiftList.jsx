import { useState } from 'react'
import axios from 'axios'
// import td from "@mui/material/td";
// import TableRow from "@mui/material/TableRow";
// import TableBody from "@mui/material/TableBody";
// import Table from "@mui/material/Table";
// import TableContainer from "@mui/material/TableContainer";
import GiftListHeader from '../components/GiftListHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDOM from 'react-dom'
// import CreateGiftModal from './CreateGiftModal'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Modal } from 'react-bootstrap'
import { Button } from '@mui/material'
import '../components/CreateGiftList.scss'

const theme = createTheme({
  palette: {
    cancel: {
      main: '#808080',
    },
  },
})
export default function CreateGiftList(props) {
  const { openGiftModal, setOpenGiftModal, gifts } = props

  const [show, setShow] = useState({})

  const handleShow = (giftId) => setShow({ ...show, [giftId]: true })
  const handleClose = (giftId) => setShow({ ...show, [giftId]: false })

  const handleDelete = (giftId) => {
    return axios.delete(`http://localhost:3001/api/gifts/${giftId}/delete`, {
      withCredentials: true,
    })
  }
  return (
    <div className="gift-container">
      {gifts.length > 0 && (
        <table>
          <GiftListHeader />
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.id}>
                <td>{gift.gift_name}</td>
                <td className="truncate">
                  <a href={gift.store_url} target="_blank" rel="noreferrer">
                    {' '}
                    {gift.store_url}{' '}
                  </a>
                </td>
                <td>{gift.price}</td>
                <td>{gift.quantity}</td>
                <td>{gift.notes}</td>
                <td>
                  {gift.most_wanted === true && (
                    <FontAwesomeIcon
                      className="heart"
                      icon={['fas', 'heart']}
                    />
                  )}
                </td>
                <td>
                  <FontAwesomeIcon icon={['fas', 'edit']} />
                </td>

                <td className="click trash" onClick={() => handleShow(gift.id)}>
                  <FontAwesomeIcon icon={['fas', 'trash']} />
                </td>
                {ReactDOM.createPortal(
                  <Modal show={show[gift.id]}>
                    <Modal.Header
                      closeButton
                      onClick={() => handleClose(gift.id)}
                    >
                      <Modal.Title>Delete Gift</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <p className="confirm-msg">
                        Are you sure you wish to delete this gift?
                      </p>
                      <p className="delete-warning">
                        This action cannot be undone
                      </p>
                    </Modal.Body>

                    <Modal.Footer>
                      <div>
                        <ThemeProvider theme={theme}>
                          <Button
                            onClick={() => handleClose(gift.id)}
                            variant="outlined"
                            color="cancel"
                          >
                            Cancel
                          </Button>
                        </ThemeProvider>
                      </div>
                      <Button
                        onClick={() => handleDelete(gift.id)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>,
                  document.body,
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
