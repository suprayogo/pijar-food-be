const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require('./database');


// routing
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get("/recipes/:id", async function (req, res) {
    try {
      const {
        params: { id },
      } = req;
  
      if (isNaN(id)) {
        res.status(400).json({
          status: false,
          message: "ID must be integer",
        });
  
        return;
      }
  
      const query = await db`SELECT * FROM recipes WHERE id = ${id}`;
  
      res.json({
        status: true,
        message: "Get data success",
        data: query,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error in server",
      });
    }
  });
  
  // get all data
  app.get("/recipes", async function (req, res) {
    try {
    const query = await db`SELECT * FROM recipes`;
    res.json({
      status: true,
      message: "Get data success",
      data: query,
    });

      } catch (error) {
        res.json({
            status: false,
            message: "Get data not success",
            data: query,
          });

      }
      

  });
  
  // insert data
  app.post("/recipes", async function (req, res) {

try {
  
// database.push(req.body);
const { recipePicture, title, ingredients, video_link } = req.body;

// validasi input
if (!( recipePicture && title && ingredients && video_link )) {
  res.status(400).json({
    status: false,
    message: "Bad input, please complete all of fields",
  });

  return;
}

const payload = {
    recipePicture,
    title,
    ingredients,
    video_link,
    
};

const query = await db`INSERT INTO recipes ${db(
  payload,
    "recipePicture",
    "title",
    "ingredients",
    "video_link",

)} returning *`;;

res.send({
  status: true,
  message: "Success insert data",
  data: query,
});


} catch (error) {
  res.send({
  status: false,
  message: "failed insert data",
  data: query,
});
}


});



//   edit
  app.patch("/recipes/:id", async function (req, res) {
   try{
const {
    params: { id },
    body: {  recipePicture,
        title,
        ingredients,
        video_link
         },
  } = req;

  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      message: "ID must be integer",
    });

    return;
  }

  const checkData = await db`SELECT * FROM recipes WHERE id = ${id}`;

  // validasi jika id yang kita mau edit tidak ada di database
  if (!checkData.length) {
    res.status(404).json({
      status: false,
      message: "ID not found",
    });

    return;
  }

  const payload = {
    recipePicture: recipePicture ?? checkData[0].recipePicture,
    title: title ?? checkData[0].title,
    ingredients: ingredients ?? checkData[0].ingredients,
    video_link: video_link ?? checkData[0].video_link,
  
  };

  const query = await db`UPDATE recipes set ${db(
    payload,
    "recipePicture",
    "title",
    "ingredients",
    "video_link"
    )} WHERE id = ${id} returning *`;

  res.send({
    status: true,
    message: "Success edit data",
    data: query,
  });
   } catch (error){
     res.send({
    status: false,
    message: "failed edit data",
    data: query, 
   });
   }
  
});

// delete data
app.delete("/recipes/:id", async function (req, res) {
  try {
  const {
    params: { id },
  } = req;

  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      message: "ID must be integer",
    });

    return;
  }

  const checkData = await db`SELECT * FROM recipes WHERE id = ${id}`;

  // validasi jika id yang kita mau edit tidak ada di database
  if (!checkData.length) {
    res.status(404).json({
      status: false,
      message: "ID not found",
    });

    return;
  }

  const query = await db`DELETE FROM recipes WHERE id = ${id} returning *`

  res.send({
    status: true,
    message: "Success delete data",
    data: query,
  });
  } catch (error){
      res.send({
    status: false,
    message: "failed delete data",
    data: query,
  });
  }
});



// users------------------------------------------------------

app.get("/users/:id", async function (req, res) {
    try {
      const {
        params: { id },
      } = req;
  
      if (isNaN(id)) {
        res.status(400).json({
          status: false,
          message: "ID must be integer",
        });
  
        return;
      }
  
      const query = await db`SELECT * FROM users WHERE id = ${id}`;
  
      res.json({
        status: true,
        message: "Get data success",
        data: query,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error in server",
      });
    }
  });
  
  // get all data
  app.get("/users", async function (req, res) {
    const query = await db`SELECT * FROM users`;
  
    res.json({
      status: true,
      message: "Get data success",
      data: query,
    });
  });
  
  // insert data
  app.post("/users", async function (req, res) {

    try {
 // database.push(req.body);
    const { 
        email, 
        fullname, 
        phoneNumber, 
        password,
        profilePicture 
        } = req.body;
  
    // validasi input
    if (!( email && fullname && phoneNumber && password && profilePicture )) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      });
  
      return;
    }
  
    const payload = {
        email,
        fullname,
        phoneNumber,
        password,
        profilePicture,
        
    };
  
    const query = await db`INSERT INTO users ${db(
      payload,
        "email",
        "fullname",
        "phoneNumber",
        "password",
        "profilePicture",
 
    )} returning *`;
  
    res.send({
      status: true,
      message: "Success insert data",
      data: query,
    });
    } catch (error){
        res.send({
      status: false,
      message: "failed insert data",
      data: query,
    });
    }
   
  });


//   edit
  app.patch("/users/:id", async function (req, res) {
try {
const {
    params: { id },
    body: {  email,
        fullname,
        phoneNumber,
        password,
        profilePicture
         },
  } = req;

  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      message: "ID must be integer",
    });

    return;
  }

  const checkData = await db`SELECT * FROM users WHERE id = ${id}`;

  // validasi jika id yang kita mau edit tidak ada di database
  if (!checkData.length) {
    res.status(404).json({
      status: false,
      message: "ID not found",
    });

    return;
  }

  const payload = {
    email: email ?? checkData[0].email,
    fullname: fullname ?? checkData[0].fullname,
    phoneNumber: phoneNumber ?? checkData[0].phoneNumber,
    password: password ?? checkData[0].password,
    profilePicture: profilePicture?? checkData[0].profilePicture,
  
  };

  const query = await db`UPDATE users set ${db(
    payload,
    "email",
    "fullname",
    "phoneNumber",
    "password",
    "profilePicture"
    )} WHERE id = ${id} returning *`;
// --------------------------------------------------------------------------------------------------
  res.send({
    status: true,
    message: "Success edit data",
    data: query,
  });
} catch (error){
 res.send({
    status: false,
    message: "Failed edit data",
    data: query,
  });
}

  
});

// delete data
app.delete("/users/:id", async function (req, res) {
  try {

  const {
    params: { id },
  } = req;

  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      message: "ID must be integer",
    });

    return;
  }

  const checkData = await db`SELECT * FROM users WHERE id = ${id}`;

  // validasi jika id yang kita mau edit tidak ada di database
  if (!checkData.length) {
    res.status(404).json({
      status: false,
      message: "ID not found",
    });

    return;
  }

  const query = await db`DELETE FROM users WHERE id = ${id} returning *`

  res.send({
    status: true,
    message: "Success delete data",
    data: query,
  });
  } catch (error) {
      res.send({
    status: false,
    message: "failed delete data",
    data: query,
  });
  }
});



app.get("/", function (req, res) {
  res.send("How are you today?");
});

// listener
app.listen(3000, () => {
  console.log("App running in port 3000");
});