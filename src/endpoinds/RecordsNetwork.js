const express = require('express');
const { loginRepo } = require('../sql/repository/securityRepo');
const response = require('../network/response');
const { loginController, validateToken, logoutController } = require('../controller/securityController');
const { getRecordsPaginationController, deleteRecordsController } = require('../controller/recordsController');

const recordsRouter = express.Router();

recordsRouter.post('/', validateToken ,getRecords);
recordsRouter.delete('/:id', validateToken,deleteRecords);


async function getRecords(req, res) {
  const {pageNumber, pageSize, order, id} = req.body;
  try{
    if(!pageNumber || !pageSize || !order ||!id){
      return response.error(req, res, {response:'pageNumber and pageSize are required'},400 );
    }
    const records = await getRecordsPaginationController(pageNumber,pageSize, order, id)
    response.success(req,res,records,200);
  } catch(error){
    response.error(req, res, `Getting records error ${error.message}`, 500)
  }
};

async function deleteRecords(req,res){
  const recordId = req.params.id;
  try{
    await deleteRecordsController(recordId);
    response.success(req,res,{response:'record removed'},200)
  }catch(error){
    response.error(req, res, `Getting records error ${error.message}`, 500)
  }
}


module.exports = recordsRouter;