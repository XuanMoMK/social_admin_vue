import http from '@/api'
import { COMMON_ADMIN_API } from '@/api/axios/servicePort'

/**
 * @name 用户管理模块
 */
export const UserApi = {
  page: (params: any) => http.post(COMMON_ADMIN_API + '/user/page', params),
  // add: (params: any) => http.post(COMMON_ADMIN_API + '/user/add', params),
  // remove: (params: number[]) => http.post(COMMON_ADMIN_API + '/user/remove', params),
  edit: (params: any) => http.post(COMMON_ADMIN_API + '/user/edit', params),
  export: (params: any) =>
    http.post(COMMON_ADMIN_API + '/user/export', params, {
      responseType: 'blob'
    }),
  // 好友分组
  friendsGroup: (params: any) => http.post(COMMON_ADMIN_API + '/friendGroup/page', params),
  // 好友列表
  friendsPage: (params: any) => http.post(COMMON_ADMIN_API + '/friend/page', params),
  // 根据用户id获取好友申请列表
  friendApply: (params: any) => http.post(COMMON_ADMIN_API + '/friendApply/page', params),
  // 充值会员
  recharge: (params: any) => http.post(COMMON_ADMIN_API + '/user/recharge', params)
}

/**
 * @name 朋友圈管理模块
 */

export const SocialCicleApi = {
  page: (params: any) => http.post(COMMON_ADMIN_API + '/socialCircle/page', params),
  // add: (params: any) => http.post(COMMON_ADMIN_API + '/socialCircle/add', params),
  remove: (params: number[]) => http.post(COMMON_ADMIN_API + '/socialCircle/remove', params),
  // edit: (params: any) => http.post(COMMON_ADMIN_API + '/socialCircle/edit', params),
  // 根据朋友圈id查询被屏蔽用户列表
  shieldUser: (params: any) => http.post(COMMON_ADMIN_API + '/socialCircle/shieldUser', params),
  // 根据话题圈id查询帖子
  commentsPage: (params: any) => http.post(COMMON_ADMIN_API + '/socialCircleComment/page', params),
  commentsRemove: (params: any[]) => http.post(COMMON_ADMIN_API + '/socialCircleComment/remove', params)
}

/**
 * @name 话题管理模块
 */
export const TopicCicleApi = {
  page: (params: any) => http.post(COMMON_ADMIN_API + '/topicCircle/page', params),
  add: (params: any) => http.post(COMMON_ADMIN_API + '/topicCircle/add', params),
  remove: (params: any[]) => http.post(COMMON_ADMIN_API + '/topicCircle/remove', params),
  edit: (params: any) => http.post(COMMON_ADMIN_API + '/topicCircle/edit', params),
  // 根据话题圈id查询话题圈成员
  member: (params: any) => http.post(COMMON_ADMIN_API + '/topicCircleUser/page', params),
  memberRemove: (params: any) => http.post(COMMON_ADMIN_API + '/topicCircleUser/remove', params),
  // 根据话题圈id查询帖子
  postPage: (params: any) => http.post(COMMON_ADMIN_API + '/topicCirclePost/page', params),
  postRemove: (params: any) => http.post(COMMON_ADMIN_API + '/topicCirclePost/remove', params),
  commentsPage: (params: any) => http.post(COMMON_ADMIN_API + '/topicCircleComment/page', params),
  commentsRemove: (params: any) => http.post(COMMON_ADMIN_API + '/topicCircleComment/remove', params)
}

/**
 * @name 用户笔记管理
 */
export const NotesApi = {
  page: (params: any) => http.post(COMMON_ADMIN_API + '/notes/page', params),
  // add: (params: any) => http.post(COMMON_ADMIN_API + '/notes/add', params),
  remove: (params: number[]) => http.post(COMMON_ADMIN_API + '/notes/remove', params)
  // edit: (params: any) => http.post(COMMON_ADMIN_API + '/notes/edit', params)
}
