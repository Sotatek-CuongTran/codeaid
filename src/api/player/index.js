// ---------------------------------------------------------------------------------------------
// YOU CAN MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// YOU SHOULD NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// ---------------------------------------------------------------------------------------------

const bearerToken = "SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE="
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const reqToken = bearer[1];
    if (bearerToken == reqToken) {
      return next();
    }
    res.sendStatus(403);
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

export default (app) => {
  app.put(
    `/player/:id`,
    require('./update').default
  );
  app.delete(
    `/player/:id`,
    verifyToken,
    require('./delete').default
  );
  app.get(
    `/player`,
    require('./getList').default
  );
  app.post(
    `/player`,
    require('./create').default
  );
};