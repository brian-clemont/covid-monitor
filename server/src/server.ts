import app from './app';

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const PORT = normalizePort(process.env.PORT || '4000');
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
