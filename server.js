const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret            : 'getWrecked',
  saveUninitialized : true,
  resave            : true,
  cookie:{maxAge : 1000 * 60 * 60}
}));

// Public Folder
app.use(express.static('./public'));

var connection = mysql.createConnection({
    host    : '127.0.0.1',
    user    : '--',
    password: '--',
    database: 'student admission',
});

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).array('Image',[6]);

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      console.log(err);
    } else {
      if(req.files == undefined){
        console.log('undefined');
      } else {

        for(var i = 0; i < 6; i++) {
          var post = {
            Log_Id : sess.userId,
            img : req.files[i].path
          };
          var query = connection.query('INSERT INTO image SET ?', post, function(err,result) {
            if(err) {
              console.log(err.toString());
              res.status(500).send(err.toString());
            } else {
              console.log("Done");
            }
          });
        }
      }
    }
  });
});

//Hashing Function
function hash(input, salt) {
  var hashed = crypto.pbkdf2Sync(input, salt, 10000, 21, 'sha512');
  return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

//Storing Student Credentials
app.post('/signup', (req, res) => {

  var dbString = hash(req.body.password.toString(), 'getRandomValues');
  var posting = {
    Log_Id    : req.body.IDe.toString(),
    Password  : dbString,
    Email     : req.body.Email.toString(),
    Phone_Num : req.body.Phone.toString()
  };
  console.log(posting);
	var query = connection.query('INSERT INTO student_cred SET ?', posting, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log('Registered Successfully');
      res.status(500);
      res.send();
    }
  });
});

//logging in
var sess;
app.post('/login', (req, res) => {
  var username = req.body.username.toString();
  var password = req.body.password;

  var flag=0;
  if(username === "admin" && password.toString() === "admin")
    flag = 1;

  var query = connection.query('SELECT * from student_cred WHERE Email = ?', [username], function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else if(result[0]) {
      var dbString = result[0].Password;
      var salt = dbString.split('$')[2];
      var hashedPassword = hash(password.toString(), salt);
      if (hashedPassword === dbString) {

        //Session
        sess = req.session.auth = {userId: result[0].Log_Id};
        console.log("LOGGED IN!!");
        res.status(500);
        res.send();
      } else {
          res.status(404);
          res.send();
      }
    } else if(flag == 1) {
      res.status(200);
      res.send();
    } else {
      res.status(400);
      res.send();
    }
  });
});

app.get('/user', function(req, res) {
  var query = connection.query('SELECT * from student_cred WHERE Log_Id = ?', [sess.userId], function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.get('/confirmed', function(req, res) {
  var query = connection.query('SELECT * from student_cred WHERE Status="confirmed"', function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.post('/docs', function(req, res) {
  var username = req.body.username.toString();
  var query = connection.query('SELECT * from image WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.get('/notconfirmed', function(req, res) {
  var query = connection.query('SELECT * from student_cred WHERE Status="non confirmed"', function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.post('/setconfirmed', function(req, res) {
  var username = req.body.username.toString();
  var update = {
    Status : 'confirmed',
    Roll_No : req.body.Roll.toString()
  };
  var updateP = {
    Log_Id        : sess.userId,
		First_N       : req.body.FName.toString(),
    Last_N        : req.body.LName.toString(),
    Father_N      : req.body.MName.toString(),
    Mother_N      : req.body.MoName.toString(),
    Email         : req.body.Email.toString()
  };
  var updateE = {
    SSC_Got   : req.body.TotT.toString(),
    SSC_Out     : req.body.OutT.toString(),
    HSC_Got   : req.body.TotTw.toString(),
    HSC_Out     : req.body.OutTw.toString(),
    CET_Total  : req.body.TotC.toString(),
    JEE_Total  : req.body.TotJ.toString()
  };
  var updateB = {
    B_Name      : req.body.B_Name.toString(),
    B_Branch    : req.body.Br_Name.toString(),
    Acc_No      : req.body.Acc_No.toString(),
    IFSC_No     : req.body.Ifsc.toString(),
		MICR_No     : req.body.Micr.toString()
  };
  var updateG = {
    Name       : req.body.F_Name.toString(),
    Contact    : req.body.Contact.toString(),
    Email      : req.body.EmailP.toString(),
    Occupation : req.body.Occu.toString(),
		Office_Add : req.body.Ofad.toString()
  };
  var query = connection.query('UPDATE student_cred SET ? WHERE Log_Id = ?', [update, username], function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  var query1 = connection.query('UPDATE personal SET ? WHERE Log_Id = ?', [updateP, username], function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  var query2 = connection.query('UPDATE edu_details SET ? WHERE Log_Id = ?', [updateE, username], function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  var query3 = connection.query('UPDATE bank_details SET ? WHERE Log_Id = ?', [updateB, username], function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  var query = connection.query('UPDATE parent_guard SET ? WHERE Log_Id = ?', [updateG, username], function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.send();
});

app.post('/deletef', function(req, res) {
  var username = req.body.username.toString();
  var query = connection.query('DELETE FROM personal WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  var query2 = connection.query('UPDATE student_cred SET Status = "canceled" WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  var query1 = connection.query('DELETE FROM edu_details WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.send();
});

app.post('/form', function(req, res) {
  var username = req.body.username.toString();
  var query = connection.query('SELECT * from personal WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.post('/form2', function(req, res) {
  var username = req.body.username.toString();
  var query = connection.query('SELECT * from edu_details WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.post('/form3', function(req, res) {
  var username = req.body.username.toString();
  var query = connection.query('SELECT * from bank_details WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.post('/form4', function(req, res) {
  var username = req.body.username.toString();
  var query = connection.query('SELECT * from parent_guard WHERE Log_Id = ?', username, function(err,result) {
    if(err) {
      console.log(err.toString());
      res.status(500).send(err.toString());
    } else {
      res.json(result);
    }
  });
});

app.get('/session', function(req, res) {
  res.json(sess);
});

app.get('/logout', (req, res) => {
  delete req.session;
  sess.userId = '';
  res.status(500);
  res.send();
});

//Storing Personal Information of Student
app.post('/insert', (req, res) => {
	var posting = {
    Log_Id        : sess.userId,
		First_N       : req.body.FName.toString(),
    Last_N        : req.body.LName.toString(),
    Father_N      : req.body.MName.toString(),
    Mother_N      : req.body.MoName.toString(),
		Gender        : req.body.Gender.toString(),
    DaOB          : req.body.DaOB.toString(),
    Address_Res   : req.body.Address.toString(),
    Address_Perma : req.body.Address.toString(),
    City          : req.body.City.toString(),
    State         : req.body.State.toString(),
    Pincode       : req.body.Pin.toString(),
    Aadhar        : req.body.Aadhar.toString(),
    Email         : req.body.Email.toString(),
    State_Dom     : req.body.StOD.toString(),
    Sub_Categ     : req.body.SubCategory.toString(),
    Category      : req.body.Category.toString(),
    State_Dom     : req.body.StOD.toString(),
    Branch        : req.body.Branch.toString()
	}
	var query = connection.query('INSERT INTO personal SET ?', posting, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log('Inserted Successfully');
    }
  });
});

app.post('/insert1', (req, res) => {
	console.log(req.body);
	var postingT = {
    // Log_Id        : sess.userId,
    Log_Id        : sess.userId,
    Seat          : req.body.RollT.toString(),
    YoP           : req.body.YoPT.toString(),
    Board         : req.body.BoardT.toString(),
    Tenth_Total   : req.body.TotT.toString(),
    Maths         : req.body.MathT.toString(),
    Tenth_out     : req.body.OutT.toString()
	};
  var postingTw = {
    // Log_Id        : sess.userId,
    Log_Id        : sess.userId,
    Seat          : req.body.RollTw.toString(),
    YoP           : req.body.YoPTw.toString(),
    Board         : req.body.BoardTw.toString(),
    Twelve_Total  : req.body.TotTw.toString(),
    Maths         : req.body.MathTw.toString(),
    Physics       : req.body.PhyTw.toString(),
    Chemistry     : req.body.ChemTw.toString(),
    Twelve_Out    : req.body.OutTw.toString()
	};
  var postingC = {
    // Log_Id        : sess.userId,
    Log_Id        : sess.userId,
    Roll_No       : req.body.RollC.toString(),
    YoP           : req.body.YoPC.toString(),
    Board         : req.body.BoardC.toString(),
    Maths         : req.body.MathC.toString(),
    Physics       : req.body.PhyC.toString(),
    Chem          : req.body.ChemC.toString(),
    CET_Total     : req.body.TotC.toString()
	};
  var postingJ = {
    // Log_Id        : sess.userId,
    Log_Id        : sess.userId,
    Roll_No       : req.body.RollJ.toString(),
    YoP           : req.body.YoPJ.toString(),
    Maths         : req.body.MathJ.toString(),
    Physics       : req.body.PhyJ.toString(),
    Chemistry     : req.body.ChemJ.toString(),
    JEE_Total     : req.body.TotJ.toString()
	};
	var query = connection.query('INSERT INTO 10th SET ?', postingT, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log('10th Done');
    }
    });
    var query1 = connection.query('INSERT INTO 12th SET ?', postingTw, function(err,result) {
      if(err) {
        console.log(err);
      } else {
        console.log('12th Done');
      }
      });
    var query2 = connection.query('INSERT INTO cet SET ?', postingC, function(err,result) {
      if(err) {
        console.log(err);
      } else {
        console.log('CET Done');
      }
      });
    var query3 = connection.query('INSERT INTO jee SET ?', postingJ, function(err,result) {
      if(err) {
        console.log(err);
      } else {
        console.log('JEE Done');
      }
      });
});

app.post('/insert2', (req, res) => {
	console.log(req.body);
  // B_Name, Br_Name, Acc_No, Ifsc, Micr
	var posting = {
    Log_Id      : sess.userId,
		B_Name      : req.body.B_Name.toString(),
    B_Branch    : req.body.Br_Name.toString(),
    Acc_No      : req.body.Acc_No.toString(),
    IFSC_No     : req.body.Ifsc.toString(),
		MICR_No     : req.body.Micr.toString()
	}
	var query = connection.query('INSERT INTO bank_details SET ?', posting, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log('Bank Done');
    }
      });
});

app.post('/insert3', (req, res) => {
	var posting = {
    Log_Id     : sess.userId,
		Name       : req.body.F_Name.toString(),
    Contact    : req.body.Contact.toString(),
    Email      : req.body.EmailP.toString(),
    Occupation : req.body.Occu.toString(),
		Office_Add : req.body.Ofad.toString()
	}
	var query = connection.query('INSERT INTO parent_guard SET ?', posting, function(err,result) {
    if(err) {
      console.log(err);
    } else {
      console.log('Parent Done');
    }
      });
});

app.listen(4000, () => {
	console.log('Listening at 4000');
});
