declare interface Cardbag {
  pkId: number
  name: string
  summary: string
  validDays: number
  price: number
  deleteFlag?: number
  createTime?: string
  updateTime?: string
}
declare interface ReqEditeCardbagParams {
  pkId: number
  name: string
  summary: string
  validDays: number
  price: number
}

declare interface ReqPageRechargeRecord {
  asc?: boolean
  limit: number
  order?: string
  name: string
  page: number
  phone: string
  userName: string
}

declare interface UserType {
  pkId: number
  account: string
  nickname: string
  avatar?: any
  phone: string
  company?: any
  gender: number
  endTime?: string // 会员到期时间
  createTime?: string
}

declare interface ReqPageUser {
  asc?: boolean
  company?: string
  limit: number
  nickname?: string
  order?: string
  page: number
  phone?: string
}

declare interface RechargeRecordType {
  pkId: number
  nickname: string
  avatar: string
  phone: string
  userId: number
  name: string
  summary: string
  validDays: number
  price: number
  createTime?: string
}

declare interface SocialCircleType {
  pkId: number
  nickname: string
  phone: string
  avatar: string
  company: string
  userId: number
  content: string
  resourcesList?: any
  createTime?: string
}
