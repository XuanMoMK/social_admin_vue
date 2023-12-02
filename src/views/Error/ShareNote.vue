<template>
  <div class="wrapper">
    <div class="top">
      <el-avatar shape="square" :size="50" :src="note.avatar" />
      <div class="flex-1 top_r">
        <div class="top_r--name">{{ note.nickname }}</div>
        <div class="top_r--time">{{ note.time }}</div>
      </div>
    </div>

    <div class="note">
      <p class="note--title">{{ note.title }}</p>
      <p class="note--content">{{ note.content }}</p>
    </div>

    <!-- 九宫格 -->
    <div class="num-container">
      <div class="num-item" v-for="(item, index) in note.resourceList" :key="index">
        <div v-if="item.type == 0">
          <el-image style="width: 100%; height: 100px" :src="item.url" :zoom-rate="1.2" :preview-src-list="[item.url]" hide-on-click-modal fit="cover" />
        </div>
        <div v-if="item.type == 1" class="videoContent" @click="btnFullVideo(item.url)">
          <svg class="vicon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
            ></path>
          </svg>
          <video
            :id="item.url"
            class="videoElement"
            :src="item.url + '#t=3'"
            preload="metadata"
            style="width: 100%; height: 100%"
            :poster="item.videoCoverUrl"
            @fullscreenchange="fullscreenchange(item.url)"
          ></video>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <button class="next-btn">打开app</button>
  </div>
</template>
<script setup>
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import http from '@/api'
const route = useRoute()

onMounted(() => {
  let noteId = route.query.noteId
  // let decodedData = window.atob(param) //base64解密
  // ----------------
  http.post('https://testjszyy.pspress.cn/client/note/getShareNote', { noteId }).then((res) => {
    if (res.code == 0) {
      console.log('数据：', res.data)
      let data = res.data
      note.nickname = data.nickname
      note.avatar = data.avatar
      note.time = TimestampToDate(data.timestamp)
      note.noteId = data.noteId
      note.content = data.content
      note.resourceList = data.resourceList
      note.title = data.title
    }
  })
})
const note = reactive({
  nickname: '',
  avatar: '',
  time: '',
  noteId: 0,
  content: '',
  // 资源：0图片，1视频
  resourceList: [],
  title: ''
})

// 时间戳转时间
function TimestampToDate(Timestamp) {
  let date1 = new Date(Timestamp * 1000)
  return date1.toLocaleDateString().replace(/\//g, '-') + ' ' + date1.toTimeString().substr(0, 8)
}

// 全屏幕播放
const btnFullVideo = (id) => {
  const elVideo = document.getElementById(id)
  if (elVideo.requestFullscreen) {
    elVideo.requestFullscreen()
    elVideo.play()
  } else if (elVideo.webkitRequestFullScreen) {
    elVideo.webkitRequestFullScreen()
    elVideo.play()
  } else if (elVideo.mozRequestFullScreen) {
    elVideo.mozRequestFullScreen()
    elVideo.play()
  } else {
    elVideo.play()
  }
}
// 退出全屏停止
const fullscreenchange = (id) => {
  const video = document.getElementById(id)
  if (!document.webkitIsFullScreen) {
    video.pause()
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.flex-1 {
  flex: 1;
}

.wrapper {
  display: flex;
  flex-flow: column nowrap;
  padding: 20px 15px 37px;
  /* 顶部区域 */
  .top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    &_r {
      height: 100%;
      padding: 1px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &--name {
        font-size: 16px;
      }
      &--time {
        color: #aeaeae;
        font-size: 12px;
      }
    }
  }
  .note {
    &--title {
      font-size: 16px;
      font-weight: 500;
    }
    &--content {
      font-size: 14px;
      color: rgb(25, 24, 24);
    }
  }
}

/* 数字宫格 */
.num-container {
  display: grid;
  // grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(3, 32%);
  // grid-template-rows: repeat(3, 100px);
  // grid-template-rows: repeat(3, 100px);
  gap: 12px 8px;
  margin-bottom: 22px;
  .num-item {
    width: 100%;
    background-color: #f6f6f6;
    text-align: csenter;
    align-self: center;
    justify-self: center;
  }
}

/* NEXT按钮 */
.next-btn {
  position: fixed;
  bottom: 30px;
  left: 10%;
  width: 80%;
  height: 50px;
  border-radius: 12px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 15px;
  background: #3365af;
}

.videoContent {
  // background-color: rgb(40, 46, 83);
  width: 100%;
  height: 100px;
  position: relative;
  .vicon {
    width: 30px;
    color: white;
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 35px;
    margin-right: calc(50% - 15px);
    z-index: 100;
  }
}

// .videoElement {
// object-fit: fill;
// }
</style>
