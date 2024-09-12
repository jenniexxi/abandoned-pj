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

export type DetailMetaInfo = MetaInfo & {};

export type MetaInfoList = {
  message: string;
  metaAnimalSearch: { fciGroupCodeList: number[]; countryList: string[] };
  animalList: MetaInfo[];
  count: number;
  misMatchingCount: number;
};

export type ReqCreateMetaList = {
  memberId: number;
  fciGroupCode: number;
  country: string;
  kind: string;
  childKindCodeList: number[];
  matchingDataList: string[];
};

export type RespCreateMetaList = ReqCreateMetaList & {
  message: string;
  id: number;
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
    page = 1
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
    query.append("size", "20");

    return axiosInstance
      .get(`bo/v1/animals/meta?${query.toString()}`)
      .then((resp) => {
        console.log(resp.data);
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
  createLists: async (body: ReqCreateMetaList): Promise<RespCreateMetaList> => {
    const tempBody = {
      ...body,
      memberId: 0,
      fciGroupCode: 1,
    };
    const result = await axiosInstance.post(`bo/v1/animals/meta`, tempBody);

    return result.data;
  },
  detailLists: (metaAnimalId: number): Promise<MetaInfo> => {
    return axiosInstance
      .get(`bo/v1/animals/meta/${metaAnimalId}`)
      .then((resp) => {
        console.log(resp.data);
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
};

export default AnimalBreed;
