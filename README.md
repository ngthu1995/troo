# Troo

A dairy, snack shopping cart application build with MERN stack with admin section to manage products and checkout section using Paypal's API (in progress).

The application uses NodeJS, Express, and Mongoose, MongoDB for server side, and React, HTML, CSS for client side. All authenticated users are able to add items to shopping cart, find products with different filters. Only admin is able to add new products to the site, manage categories to the application.

### Completed:

Users are able to sign up, sign in, and sign out. The nav links change based on user's status.
Users are able to add, delete items to cart, and the number got reflected in the cart.
The total ammount shows up in the cart.
Admin is able to add new products with images through DropZone and Cloudinary.
All users are able to toggle between grid view and list view.
The auth route checks if current user is authenticated to commit some actions or not.
Image previews are available if user click on (Lightbox).
The products shows correct info attached in database.

### In progress & future:

The cart needs to fetch all info from authenticated user's cart
Users are able to purchase items and show up in history puschase
The users are able to see his/her own info and edit if possible.
The list view should look a little more organized.
The site needs to be responsive and more cohesive.

The demo site can be viewed here: https://hidden-falls-31883.herokuapp.com/

_Admin role demo account: francis4@gmail.com_
_Admin role demo password: password1234_

## Getting Started

Node.js installed
React installed
Nodemon installed

## Technologies & Tools

- NodeJs
- Express
- HTML/CSS
- MongoDB
- Material-UI
- React
- Redux

## Prerequisites

Understanding of MongoDB, Express, React, NodeJS (MERN) along with knowledge of Heroku + Mlab

### Installing

1. Clone the repo to your local machine \
   `$ git clone https://github.com/ngthu1995/troo`

2. Install dependencies on server: \
   `$ cd troo/server` \
   `$ npm install`

3. Install dependencies on client: \
   `$ cd troo/client`\
   `$ npm install`

4. Install nodemon globally \
   `npm install -g nodemon`

5. Start server: \
   `$ npm start`

6.Start client: \ 
   `$ npm client`

7. Or Run server and client at the same time after installing _concurrently_ \
   `$ npm run dev`

8. App now running on

## Running the tests

Test Driven Development (TDD) is used throughout the application ultitlizing Mocha and Chai.
Tests can be performed by running _npm test_ or _mocha_

Below are two examples of tests:

```
describe("GET /", function() {
  // #1 should return home page

  it("should return home page", function(done) {
    // calling home page api
    request.get("/", (err, res) => {
      expect(200);
      done();
    });
  });
});

describe("GET /abc", function() {
  // #1 should return 404

  it("should return home 404", function(done) {
    // calling home page api with invalid query
    request.get("/abc", (err, res) => {
      expect(404);
      done();
    });
  });
});
```

## Deployment

The site is deployed with Heroku and Mlab adds-on.

## Built With

MERN - The web framework used

## Versioning

Node: 10.15.0
_material-ui/core: 3.9.3_
_babel/runtime": 7.4.3_

## Author

Thu Nguyen - personal website: http://thunguyen.space/

## License

This project is licensed under ThuNguyen@2019.

## Acknowledgments

A big thank to all the articles from medium and helpful guide, support from people around me.
