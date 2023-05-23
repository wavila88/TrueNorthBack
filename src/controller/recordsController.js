const { getRecordsWithPaginationRepo, deleteRecordsRepo, countRecordsRepo } = require("../sql/repository/recordsRepo")

const getRecordsPaginationController = async (pageNumber, pageSize,order, id) => {
 const records = await getRecordsWithPaginationRepo(pageNumber, pageSize, order, id);
 const recordsCount = await countRecordsRepo(id);
 return {records, recordsCount};
}

const deleteRecordsController = async (id) => {
  return await deleteRecordsRepo(id);
}





module.exports = {
  getRecordsPaginationController,
  deleteRecordsController
}