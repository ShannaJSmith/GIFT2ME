import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvent } from '../services/event';
import { getGifts } from '../services/gift';

/* ------ Components ------- */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventWishList from '../components/EventWishList';
import GifterEventInfo from '../components/GifterEventInfo';

export default function Event() {
  const { id } = useParams();

  const [eventInfo, setEventInfo] = useState({});
  const [gifts, setGifts] = useState([]);

  const handleEventInfo = async (id) => {
    try {
      const response = await getEvent(id);
      setEventInfo(response.data);
    } catch (e) {
      console.log('error:', e);
    }
  };
  const handleGiftsList = async (id) => {
    try {
      const response = await getGifts(id);
      setGifts(response.data.gifts);
    } catch (e) {
      console.log('error:', e);
    }
  };

  useEffect(() => {
    handleGiftsList(id);
    handleEventInfo(id);
  }, [id]);

  return (
    <>
      <Navbar />
      <GifterEventInfo eventInfo={eventInfo} />
      <EventWishList gifts={gifts} event_id={id} setGifts={setGifts} />
      <Footer />
    </>
  );
}
