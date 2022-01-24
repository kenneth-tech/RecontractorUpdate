const fetch = require('node-fetch');
const URI = 'http://localhost:2108/api';

exports.rendercontractorupdate = async (req, res) => {
  res.render('contractor/contractorupdate', {
    layout: 'contractor/contractorupdate',
  });
};

exports.rendercontractorprofile = async (req, res) => {
  res.render('contractor/contractorprofile', {
    layout: 'contractor/contractorprofile',
  });
};
exports.renderRegister = async (req, res) => {
  res.render('contractor/contractorsignup', {
    layout: 'contractor/contractorsignup',
  });
};
exports.renderrequestlist = async (req, res) => {
  res.render('contractor/requestlist', {
    layout: 'contractor/requestlist',
  });
};
exports.rendercontractorlogin = async (req, res) => {
  res.render('contractor/contractorsignup', {
    layout: 'contractor/contractorsignup',
  });
};

exports.renderchatbox = async (req, res) => {
  res.render('contractor/chatbox', {
    layout: 'contractor/chatbox',
  });
};
exports.contractorregister = async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      UserName: req.body.Username,
      FirstName: req.body.Firstname,
      LastName: req.body.Lastname,
      EmailAddress: req.body.Emailaddress,
      Address: req.body.Address,
      Password: req.body.Password,
    }),
  };

  const response = await fetch(`${URI}/contractor/add`, options);
  const resData = await response.json();
  console.log(resData);
  if (response.status === 200) {
    res.render('contractor/contractorsignup', {
      layout: 'contractor/contractorsignup',
      resData: resData,
      success: true,
      message: resData.message,
    });
  } else {
    res.render('contractor/contractorsignup', {
      layout: 'contractor/contractorsignup',
      resData: resData,
      success: true,
    });
  }
};

exports.contractorlogin = async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      EmailAddress: req.body.Emailaddress,
      Password: req.body.Password,
    }),
  };

  const response = await fetch(`${URI}/contractor/login`, options);
  const resData = await response.json();
  console.log(resData.token);
  if (response.status === 200) {
    res.cookie('authToken', resData.token, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('contractorID', resData._id, { maxAge: 24 * 60 * 60 * 1000 });
    res.redirect('/update');
  } else {
    res.redirect('/cregister');
  }
};

exports.houseupload = async (req, res) => {
  const pathImages = [];
  for (let i = 0; i < req.files.length; i++) {
    pathImages.push(req.files[i].path);
  }
  const token = await req.cookies.authToken;
  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      housePrice: req.body.price,
      houseType: req.body.Housetype,
      lotSize: req.body.lotSize,
      bedRoom: req.body.bedRoom,
      cr: req.body.cr,
      imageHouse: pathImages,
    }),
  };
  console.log(req.body);

  const response = await fetch(`${URI}/contractor/uploadproject`, options);
  const resData = await response.json();
  console.log(resData);
  if (response.status === 200) {
    res.redirect('/update');
    // res.render('contractor/contractorupdate', {
    //   layout: 'contractor/contractorupdate',
    //   resData: resData,
    //   success: true,
    //   message: resData.message,
    // });
  } else {
    res.redirect('/update');
    // res.render('contractor/contractorupdate', {
    //   layout: 'contractor/contractorupdate',
    //   resData: resData,
    //   success: true,
    // });
  }
};

exports.rendercontractorupdate = async (req, res) => {
  const contractorID = req.cookies.contractorID;
  console.log(contractorID);
  const options = {
    method: 'GET',
    headers: {
      Authorization: req.cookies.authToken,
      'Content-type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
  };

  const response = await fetch(
    `${URI}/contractor/info/${contractorID}`,
    options
  );
  const resData = await response.json();
  console.log(resData);
  const { FirstName, LastName, Address, EmailAddress, Houses } = resData.data;
  console.log(resData.data);
  res.render('contractor/contractorupdate', {
    layout: 'contractor/contractorupdate',
    Fullname: `${FirstName} ${LastName}`,
    Address: Address,
    EmailAddress: EmailAddress,
    Houses: Houses,
  });
};
