const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
server.use(cors());
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;

server.use(jsonServer.bodyParser)
server.post('/execute', (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body)
    let checkingParameter = req.body['checkingParameter'];
    let userName = req.body['userName'];
    let otp = req.body['otp'];
    let otpID = req.body['otpID'];
    let password = req.body['password'];
    let user = req.body['user'];

    // check user name
    if (checkingParameter === 'userName') {
      res.status(200).jsonp({
        checkingParameter: 'userName',
        resultCode: userName === '1111111111' ? 11 : 10,
        resultDescription: 'mo ta'
      });
    }

    // check password
    if (checkingParameter === 'password') {
      res.status(200).jsonp({
        checkingParameter: 'password',
        userToken: 1234567890,
        resultCode: password === '000000' ? 21 : 20,
        resultDescription: 'mo ta'
      });
    }

    // check otp
    if (otp && otpID) {
      res.status(200).jsonp({
        resultCode: otp === otpID ? 11 : 10,
        resultDescription: 'mo ta'
      });
    }

    // reset password
    if (userName && password) {
      res.status(200).jsonp({
        resultCode: 11,
        userToken: 1234567890,
        resultDescription: 'mo ta'
      });
    }
    
    // create user
    if (user && password) {
      res.status(200).jsonp({
        resultCode: 11,
        resultDescription: 'mo ta'
      });
    }

    // send otp
    if (!checkingParameter && !otp && userName) {
      res.status(200).jsonp({
        resultCode: 11,
        otpID: 123456,
        resultDescription: 'mo ta'
      });
    }
    
  }
})
// server.post('/execute', (req, res) => {
//   if (req.method === 'POST') {
//     let userId = req.body['userId'];
//     if (userId != null && userId >= 0) {
//       let result = db.users.find(user => {
//         return user.userId == userId;
//       })

//       if (result) {
//         let {id, ...user} = result;
//         res.status(200).jsonp(user);
//       } else {
//         res.status(400).jsonp({
//           error: "Bad userId"
//         });
//       }
//     } else {
//       res.status(400).jsonp({
//         error: "No valid userId"
//       });
//     }
//   }
// });

server.use(middlewares);
server.use(router);
server.listen(port);

