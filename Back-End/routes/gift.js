const express = require("express");
const router = express.Router();
const { db } = require("../lib/db");

router.put("/:gift_id", async (req, res, next) => {
  const { event_id } = req.body;
  const { gift_id } = req.params;
  await db.query(
    `Update gifts SET quantity = quantity - 1  WHERE event_id = $1 AND id=$2 RETURNING * `,
    [event_id, gift_id]
  );
  const { rows } = await db.query(`SELECT * FROM  gifts  WHERE event_id=$1 `, [
    event_id
  ]);
  console.log("rows[0]", rows[0]);
  res.json({ success: true, data: rows });
});

module.exports = router;
