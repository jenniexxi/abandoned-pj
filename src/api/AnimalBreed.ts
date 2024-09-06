import { axiosInstance } from "./api";

export type MetaInfo = {
  id: number;
  memberName: string;
  fciGroupCode: number;
  country: string;
  kind: string;
  childKindCodeList: number[];
  matchingDataList: string[];
  updatedAt: string;
};

export type MetaInfoList = {
  message: string;
  animalList: MetaInfo[];
  count: number;
  misMatchingCount: number;
};

const AnimalBreed = {
  // getDetail: (id: number): Promise<MetaInfo[]> => {
  //   const query = new URLSearchParams();
  //   query.append("animalId", id.toString());
  //   return axiosInstance
  //     .get(`/bo/v1/animals/meta?${query.toString()}`)
  //     .then((resp) => {
  //       return resp.data;
  //     })
  //     .catch((e) => console.log(e));
  // },
  // getFilter: () => {
  //   return axiosInstance
  //     .get(`/bo/v1/animals/filter`)
  //     .then((resp) => {
  //       return resp.data;
  //     })
  //     .catch((e) => console.log(e));
  // },
  getLists: (
    fciGroupCode?: number,
    country?: string,
    kind?: string,
    page=1
  ): Promise<MetaInfoList> => {
    const query = new URLSearchParams();

    if (fciGroupCode) {
      query.append("fciGroupCode", fciGroupCode.toString());
    }
    if (country) {
      query.append("country", country);
    }
    if (kind) {
      query.append("kind", kind);
    }
    // append는 string 만 받을 수 있어서 형 변환 필수
    query.append("page", page.toString());
    query.append("size", "25");

    return axiosInstance
      .get(`/bo/v1/animals/meta?${query.toString()}`)
      .then((resp) => {
        console.log(resp.data);
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
};

export default AnimalBreed;
