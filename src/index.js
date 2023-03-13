// /////////////////////////////////////////////////////////////////////////////
// IMPORTANT:
// THE CODE BELOW IS READ ONLY CODE AND YOU SHOULD INSPECT IT TO SEE WHAT IT
// DOES IN ORDER TO COMPLETE THE TASK, BUT DO NOT MODIFY IT IN ANY WAY AS THAT
// WILL RESULT IN A TEST FAILURE
// /////////////////////////////////////////////////////////////////////////////

import app from './api';
import database from './db';
// import { selectTeam } from './api/team/process'
// import model from "./db/model/index";

const port = 3000

database.sync().then(
  () => {
    // mockData().then(() => {
    //   selectTeam();
    // });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
)

export default app;