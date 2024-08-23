import { axiosInstance } from "./api";

export type AnimalInfo = {
  id: number;
  filename: string;
  happenDt: string;
  happenPlace: string;
  parentKind: string;
  kind: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  emergencyProcessState: string;
  sexCd: "M" | "F" | "Q";
  neuterYn: "Y" | "N" | "U";
  specialMark: string;
  careNm: string;
  careTel: string;
  sido: string;
  sigungu: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
  isScrap: boolean;
  imageList: string[];
};

const AnimalBreed = {
  getDetail: (animalId: number): Promise<AnimalInfo[]> => {
    const query = new URLSearchParams();
    query.append("animalId", animalId.toString());
    return axiosInstance
      .get(`/api/v1/animals?${query.toString()}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
  getFilter: () => {
    return axiosInstance
      .get(`/api/v1/animals/filter`)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
  getLists: (
    parentKindCode?: string,
    kindCode?: string[],
    weightCode?: string[],
    sortCode?: string,
    ageCode?: string[],
    genderCode?: string[],
    processStateCode?: string[],
    startDate?: string,
    endDate?: string,
    sidoCode?: string[]
  ): Promise<AnimalInfo[]> => {
    const query = new URLSearchParams();

    if (parentKindCode) {
      query.append("parentKindCode", parentKindCode);
    }
    if (kindCode) {
      query.append("kindCode", kindCode.toString());
    }
    if (weightCode) {
      query.append("weightCode", weightCode.toString());
    }
    if (sortCode) {
      query.append("sortCode", sortCode);
    }
    if (ageCode) {
      query.append("ageCode", ageCode.toString());
    }
    if (genderCode) {
      query.append("genderCode", genderCode.toString());
    }
    if (processStateCode) {
      query.append("processStateCode", processStateCode.toString());
    }
    if (startDate) {
      query.append("startDate", startDate);
    }
    if (endDate) {
      query.append("endDate", endDate);
    }
    if (sidoCode) {
      query.append("sidoCode", sidoCode.toString());
    }

    return axiosInstance
      .get(`/api/v1/animals?${query.toString()}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
};

export default AnimalBreed;
