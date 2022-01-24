const fetch = require('node-fetch');
const URI = 'http://localhost:2108/api';

exports.clientprofile = async (req, res) => {
  const userID = req.cookies.clientID;
  const options = {
    method: 'GET',
    headers: {
      Authorization: req.cookies.authToken,
      'Content-type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
  };

  const response = await fetch(`${URI}/client/info/${userID}`, options);
  const resData = await response.json();
  console.log(resData);
  const { FirstName, LastName, Address, EmailAddress } = resData.data;
  res.render('client/clientprofile', {
    layout: 'client/clientprofile',
    Fullname: `${FirstName} ${LastName}`,
    Address: Address,
    EmailAddress: EmailAddress,
  });
};

// exports.clientprofile = async (req, res) => {
//   res.render('client/clientprofile', {
//     layout: 'client/clientprofile',
//   });
// };

exports.login = async (req, res) => {
  res.render('/client/clientprofile', {
    layout: '/client/clientprofile.layout',
  });
};

exports.homepage = async (req, res) => {
  res.render('client/home', {
    layout: 'client/home',
  });
};
// exports.contractorlist = async (req, res) => {
//   res.render('client/contractorlist', {
//     layout: 'client/contractorlist',
//   });
// };

exports.renderSignup = async (req, res) => {
  res.render('client/signup', {
    layout: 'client/signup',
  });
};
// exports.viewprofile = async (req, res) => {
//   res.render('client/viewprofile', {
//     layout: 'client/viewprofile',
//   });
// };
exports.updateprofile = async (req, res) => {
  res.render('client/profileupdate', {
    layout: 'client/profileupdate',
  });
};
exports.inboxmessage = async (req, res) => {
  res.render('client/chatbox', {
    layout: 'client/chatbox',
  });
};
// exports.search = async (req, res) => {
//   res.render('client/search', {
//     layout: 'client/search',
//   });
// };

exports.register = async (req, res) => {
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

  const response = await fetch(`${URI}/add/client`, options);
  const resData = await response.json();
  console.log(resData);
  if (response.status === 200) {
    res.render('client/signup', {
      layout: 'client/signup',
      resData: resData,
      success: true,
      message: resData.message,
    });
  } else {
    res.render('client/signup', {
      layout: 'client/signup',
      resData: resData,
      success: true,
    });
  }
};

exports.login = async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      responseType: 'json',
    },
    body: JSON.stringify({
      EmailAddress: req.body.EmailAddress,
      Password: req.body.Password,
    }),
  };
  const response = await fetch(`${URI}/client/login`, options);
  const resData = await response.json();
  console.log(resData);
  if (response.status === 200) {
    res.cookie('authToken', resData.token, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('clientID', resData._id, { maxAge: 24 * 60 * 60 * 1000 });
    res.redirect('/profile');
  } else {
    res.redirect('/register');
  }
};

exports.search = async (req, res) => {
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

  const response = await fetch(`${URI}/all/filterHouses/`, options);
  const resData = await response.json();
  console.log(resData);
  const { frontView } = resData.data;
  // console.log(resData.data);
  res.render('client/search', {
    layout: 'client/search',
    resData: resData,
  });
};

exports.searchbungalow = async (req, res) => {
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

  const response = await fetch(`${URI}/all/filterBungalow`, options);
  const resData = await response.json();
  console.log(resData);
  const { frontView } = resData.data;
  // console.log(resData.data);
  res.render('client/search', {
    layout: 'client/search',
    resData: resData,
  });
};

exports.searchmodern = async (req, res) => {
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

  const response = await fetch(`${URI}/all/filterModern`, options);
  const resData = await response.json();
  console.log(resData);
  const { frontView } = resData.data;
  // console.log(resData.data);
  res.render('client/search', {
    layout: 'client/search',
    resData: resData,
  });
};

exports.searchtwostorey = async (req, res) => {
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

  const response = await fetch(`${URI}/all/filterTwoStory`, options);
  const resData = await response.json();
  console.log(resData);
  const { frontView } = resData.data;
  // console.log(resData.data);
  res.render('client/search', {
    layout: 'client/search',
    resData: resData,
  });
};

exports.contractorlist = async (req, res) => {
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

  const response = await fetch(`${URI}/all/contractors`, options);
  const resData = await response.json();
  console.log(resData);
  // console.log(resData.data);
  res.render('client/contractorlist', {
    layout: 'client/contractorlist',
    contractors: resData,
  });
};

exports.viewprofile = async (req, res) => {
  const contractorID = req.params._id;
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
  res.render('client/viewprofile', {
    layout: 'client/viewprofile',
    Fullname: `${FirstName} ${LastName}`,
    Address: Address,
    EmailAddress: EmailAddress,
    Houses: Houses,
  });
};
