const express = require("express");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const formidable = require("express-formidable");

const cloudinary = require("cloudinary");

const app = express();

const mongoose = require("mongoose");
require("dotenv").config();

const async = require("async");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true })); ///reads query string
app.use(bodyParser.json()); //reads json
app.use(cookieParser());

app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

///ngthu1995-facilitator@yahoo.com.vn
///AZh3TgoFJJIiv6PNpdDH8LFlurMLIndB_2jWvaeVLHr1_imWOsznjuwKXI9_dsEsjtn7lhcvaw2j2_U2
///EGHGvtVusCCgbIyhrk_BvWuDLBugu-nOirHWoAA-HZesvPAtOzZ-uIOQ8aB6B6kR1uNpgVHo5XDqz9qe

//Models
const { User } = require("./models/user");
const { Brand } = require("./models/brand");
const { Lifestyle } = require("./models/lifestyle");
const { Product } = require("./models/product");
const { Payment } = require("./models/payment");

//Middleware
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

//======================
//====== Products ======
//======================

app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;

  Product.find(findArgs)
    .populate("brand")
    .populate("lifestyle")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles,
      });
    });
});

///By Arrival
// /articles?sortBy=createdAt&order=desc&limit=100

//By Sell
// /articles?sortBy=sold&order=desc&limit=100

app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate("brand")
    .populate("lifestyle")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);

      res.send(articles);
    });
});

app.get("/api/product/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item); //convert id to objectId in monggoose
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("lifestyle")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post("/api/product/article", auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

//======================
//====== Lifestyle =====
//======================

app.post("/api/product/lifestyle", auth, admin, (req, res) => {
  const lifestyle = new Lifestyle(req.body);

  lifestyle.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      lifestyle: doc,
    });
  });
});

app.get("/api/product/lifestyles", (req, res) => {
  Lifestyle.find({}, (err, lifestyles) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(lifestyles);
  });
});

//==================
//====== Brand =====
//==================

app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

//==================
//====== Users =====
//==================

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      // userdata: doc
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failes, email not found",
      });

    //check the password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      //generate a token n save it as cookie
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

app.get("/api/users/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false });
    res.status(200).send("okay");
  });
});

app.post("/api/users/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId),
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map((item) => {
        return mongoose.Types.ObjectId(item.id);
      });

      Product.find({ _id: { $in: array } })
        .populate("brand")
        .populate("wood")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

app.post("/api/users/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  //user history
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  //payment dash
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            //update payment collection
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
