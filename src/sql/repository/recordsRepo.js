const Operations = require("../models/OperationModel");
const Records = require("../models/RecordModel");

const getRecordsWithPaginationRepo = async (pageNumber, pageSize,order, id) => {
  
  try {
    const offset = (pageNumber - 1) * pageSize;

    const records = await Records.findAll({
      limit: pageSize,
      offset: offset,
      attributes:['id','amount','user_balance','operation_response','createdAt','operation.type'],
      where: {record_deleted: false, user_id: id},
      include: {
        model: Operations,
        as: 'operation',
        attributes: ['type'],
      },
      order: [['createdAt', order]],
    },
    );
   
    // Hacer algo con los registros obtenidos
    return records;
  } catch (error) {
    throw Error('Error in repo records:', error);
  }
};

const countRecordsRepo = async (id) =>  await Records.count({where: { user_id: id, record_deleted: false}})

const deleteRecordsRepo = async (id) => {
  try{
    //Soft deleted
    await Records.update({record_deleted: true},{
      where: {
        id
      },
    });
  }catch(error){
    throw Error('Error deleting records:', error);
  }
}

/**
 * 
 * gets the last record of user.
 * @returns 
 */
const validateRecords = async ( userId) => 
await Records.findOne({
  where: { user_id: userId, record_deleted: false },
  order: [['createdAt', 'DESC']],
});

module.exports = {
  getRecordsWithPaginationRepo,
  deleteRecordsRepo,
  validateRecords,
  countRecordsRepo
}