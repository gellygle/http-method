import express, { Request, Response } from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

//AN INTERFACE OF USER DATA 
interface UserData {
  first_name: string;
  last_name: string;
}

const app = express();
const port = 3000;

app.use(bodyParser.json()); 

// DEFINE A ROUTE FOR SAVING USER DATA WITH POST REQUEST
app.post('/save', (req: Request, res: Response) => {
  const userData: UserData = req.body; 
  // save the user data to user.json
  fs.readFile('./src/user.json', 'utf8', (err, data) => {
    if (err) {
      // If the file doesn't exist, create an empty array
      const users: UserData[] = [];
      users.push(userData);
      fs.writeFile('./src/user.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error saving user information');
        } else {
          res.send('User information saved successfully');
        }
      });
    } else 
         {
      // modify the content append the new user data if the file exist 
      const users: UserData[] = JSON.parse(data);
      users.push(userData);
      fs.writeFile('./src/user.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error saving user information');
        } else {
          res.send('User information saved successfully');
        }
      });
    }
  });
});

// route for getting user information with GET request
app.get('/get', (req: Request, res: Response) => {
  fs.readFile('./src/user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading user information');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
