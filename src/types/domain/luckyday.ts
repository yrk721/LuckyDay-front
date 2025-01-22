import type { CommonServerModel } from "types";

export type actList = { actNo: number; keyword: string };

export interface Activities {
  category: string;
  actList: actList[];
}

export interface ActivitiesServerModel {
  code: string;
  message: string;
  resData: Activities[];
}

export interface CreateLuckyDayForm {
  customActList?: string[];
  period: number;
  cnt: number;
  expDTList?: string[];
  acts: {
    category: string;
    actList?: number[];
    checked: boolean;
  }[];
}

export interface CreateLuckyDayQuery {
  actList: number[];
  customActList?: string[];
  period: number;
  cnt: number;
  expDTList?: string[];
}

export interface CreateLuckyDayQueryModel {
  body: CreateLuckyDayQuery;
}

export interface GetLuckyDayDetail {
  dtlNo: number;
  actNm: string;
  actInfo: string;
  review: string | null;
  imageName: string | null;
  imagePath: string | null;
  imageUrl: string | null;
  category: string;
  dday: string;
}

export interface GetLuckyDayDetailServerModel extends CommonServerModel {
  resData: GetLuckyDayDetail;
}

export interface GetLuckyDayCycleInfo {
  startDt: string;
  endDt: string;
  period: number;
  cnt: number;
  expDtList: string[];
}

export interface GetLuckyDayCycleInfoServerModel extends CommonServerModel {
  resData: GetLuckyDayCycleInfo;
}

export interface GetLuckyDayCycleList {
  cyclNo: number;
  startDt: string;
  endDt: string;
}

export interface GetLuckyDayCycleResponse {
  code: string;
  message: string;
  resData: {
    cyclList: GetLuckyDayCycleList[];
  } | null;
}

export interface GetLuckyDayCycleDetail {
  dtlNo: number;
  cyclNo: number;
  dday: number;
  order: number;
  date: string;
  reviewCheck: number;
}

export interface GetLuckyDayCycleLastLuckyDaysQueryModel {
  query: {
    isCurrent: number;
  };
}

export interface GetLuckyDayCycleQueryModel {
  hasLuckyday: number;
  query: {
    isCurrent: number;
  };
}

export interface GetLuckyDayCycleServerModel extends CommonServerModel {
  resData: GetLuckyDayCycleDetail[];
}

export interface GetLuckyDayCycleDetailResponse {
  code: string;
  message: string;
  resData: GetLuckyDayCycleDetail[] | null;
}

export interface ReviewReqDto {
  dtlNo: number;
  review: string;
  imageDelete: number; // 0 = 유지, 1 = 삭제
}

export interface ReviewFormData {
  review: string;
  image: File | null;
}

export interface CreateLuckyDayReviewQueryModel {
  body: ReviewReqDto;
  image?: File | null;
}

export interface DeleteLuckyDayReviewQueryModel {
  query: {
    dtlNo: number;
  };
}

export type LuckyBallType =
  | "LuckyBall_Dday"
  | "LuckyBall_D1"
  | "LuckyBall_D2"
  | "LuckyBall_D3"
  | "LuckyBall_unknown"
  | "LuckyBallFace";

export interface LuckyBallDetail {
  type: LuckyBallType;
  dtlNo?: number;
}

export interface LuckyBallGrid {
  row1: LuckyBallDetail[];
  row2: LuckyBallDetail[];
  row3: LuckyBallDetail[];
}

export interface LuckyDayDetail {
  dday: number | null;
  dtlNo: number;
}

export interface FeedbackForm {
  content: string;
}
export interface FeedbackFormValues {
  feedback: string;
}

export interface FeedbackQueryModel {
  body: FeedbackForm;
}
