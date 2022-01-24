var express = require('express');
var router = express.Router();

const ContractorController = require('../controller/Contractor.Controller');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/assets/houses');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });
router.get('/update', ContractorController.rendercontractorupdate);
router.get('/cprofile', ContractorController.rendercontractorprofile);
router.get('/requestlist', ContractorController.renderrequestlist);
router.get('/messages', ContractorController.renderchatbox);
router.get('/cregister', ContractorController.renderRegister);
router.post('/cregister', ContractorController.contractorregister);
router.post('/clogin', ContractorController.contractorlogin);
router.get('/clogin', ContractorController.rendercontractorlogin);
router.post(
  '/update',
  upload.array('imageHouse', 4),
  ContractorController.houseupload
);

module.exports = router;
