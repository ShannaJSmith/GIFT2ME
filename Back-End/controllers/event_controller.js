const { db } = require("../lib/db");

const createEvent = async (req, res, next) => {
  const user_id = req.current_user_id;
  const { event_name, date, address, description } = req.body;
  const { rows } = await db.query(
    `INSERT INTO events (user_id, event_name, date, address, description )
     VALUES ($1, $2, $3, $4 , $5) RETURNING * `,
    [user_id, event_name, date, address, description]
  );
  console.log("----event-Data--Back-end", rows[0]);
  res.json({ success: true, data: rows[0] });
};

const getAllEvents = async (req, res) => {
  const { rows } = await db.query(`SELECT * from events`);
  res.json(rows);
};
module.exports = { createEvent, getAllEvents };
