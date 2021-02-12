
const express = require("express");

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


const user = require('./routes/users');

const { ValidationError, NotFoundError } = require('./lib/errors');

app.use(express.json({ limit: '10kb' }));
app.use('/',user)


app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});



module.exports = app;
