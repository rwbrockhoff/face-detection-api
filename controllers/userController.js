const addUserEntry = async (req, res, db) => {
  const { entries: pastEntries, id } = req.body;
  let newEntries = pastEntries + 1;
  try {
    const newEntryResponse = await db("users")
      .where({ id: id })
      .update({ entries: newEntries })
      .returning("entries");
    return res.status(200).json({ entries: newEntryResponse[0].entries || 0 });
  } catch (err) {
    console.log("Save Entry Error: ", err);
    return res
      .status(400)
      .json({ error: "Cannot post update right now. Sorry!" });
  }
};

module.exports = { addUserEntry };
