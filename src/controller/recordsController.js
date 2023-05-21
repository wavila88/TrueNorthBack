const { getRecordsWithPaginationRepo, deleteRecordsRepo } = require("../sql/repository/recordsRepo")

const getRecordsPaginationController = async (pageNumber, pageSize,order) => {
  return await getRecordsWithPaginationRepo(pageNumber, pageSize, order);
}

const deleteRecordsController = async (id) => {
  return await deleteRecordsRepo(id);
}





module.exports = {
  getRecordsPaginationController,
  deleteRecordsController
}