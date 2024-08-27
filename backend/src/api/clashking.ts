import axios from "axios";
import ServiceError from "../middleware/serviceError";
import { CWLData } from "../types/cwl";

export const fetchCWLData = async (
  targetClanTag: string,
  targetMonth: string
) => {
  try {
    const response = await axios.get<CWLData>(
      `https://api.clashking.xyz/cwl/${encodeURIComponent(
        targetClanTag
      )}/${targetMonth}`
    );
    return response.data;
  } catch (error) {
    throw ServiceError.notFound(
      `CWL data for ${targetClanTag} in ${targetMonth} does not exist`
    );
  }
};
