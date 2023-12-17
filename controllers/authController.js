const bcrypt = require("bcrypt");

const registerUser = (req, res, db) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.transaction((trx) => {
      trx
        .insert({ email, hash })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              name,
              email: loginEmail[0].email,
            })
            .then((user) => res.status(200).json({ user: user[0] }));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((error) => {
      return res.status(400).json({ error: "Unable to register" });
    });
  });
};

const signInUser = (req, res, db) => {
  const { email, password } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((user) => {
      if (!user.length) return res.status(400).json("Wrong credentials.");
      const { hash } = user[0];
      bcrypt.compare(password, hash, (err, correctPass) => {
        if (correctPass) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then((user) => {
              res.status(200).json({ user: user[0] });
            })
            .catch(() => res.status(400).json("Wrong credentials."));
        } else res.status(400).json({ error: "Wrong credentials" });
      });
    });
};

module.exports = { registerUser, signInUser };
