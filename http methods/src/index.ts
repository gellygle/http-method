          /*                                           Client side                                                       */

          import axios from 'axios';

          const userData = {
            first_name: 'laniel',
            last_name: 'Cruz',
          };
          
           // Send a POST request to save user information
          
          axios.post('http://localhost:3000/save', userData)
            .then((response: any) => {
              console.log(response.data);
            })
            .catch((error: any) => {
              console.error(error);
            });
          
           //Send a GET request to retrieve user information
          axios.get('http://localhost:3000/get')
            .then((response: any) => {
              console.log(response.data);
            })
            .catch((error: any) => {
              console.error(error);
            });
          
