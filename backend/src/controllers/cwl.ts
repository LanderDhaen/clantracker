import ServiceError from "../middleware/serviceError";
import * as cwlService from "../services/cwl";

export const getAllCWLs = async () => {
  return cwlService.getAllCWLs();
};

export const getCWLDetailsByID = async (id: number) => {
  await checkCWlExists(id);

  return cwlService.getCWLDetailsByID(id);
};

export const checkCWlExists = async (id: number) => {
  const cwl = await cwlService.checkCWlExists(id);

  if (!cwl) {
    throw ServiceError.notFound(`CWL with ID ${id} does not exist`);
  }
};
