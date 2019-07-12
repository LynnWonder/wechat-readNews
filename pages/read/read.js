// var postsData = require('../../datas/rawData.js');
import * as postsData from '../../datas/rawData.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperInfo:[],
    postList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载时处理：
    wx.stopPullDownRefresh()
    var collectionList = wx.getStorageSync('collectionList');
    // wx.clearStorageSync('num');
    var num = wx.getStorageSync('num');
    if (!collectionList) {
      // 如果不存在缓存就设置一个新缓存
      var collectionList = {};
      wx.setStorageSync('collectionList', collectionList);
    }
    if(!num){
      // 初始化storage中的num数量
      var num={};
      postsData.postList.forEach((item,index)=>{
        num[item.postid]={
          like:item.collection,
          read:item.reading
        }
      })
      wx.setStorageSync('num', num);
    }

    this.setData({
      swiperInfo: postsData.swiperInfo,
      postList: this.merageArr(postsData.postList, collectionList,num)
    })
  },
  onPullDownRefresh: function () {
    console.info("pulling...")
  },
    onTap: function (evt) {
    var postid = evt.currentTarget.dataset.postid;
    // console.log('tapid is '+postid);
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    })
  },
  onLikeTap: function (evt) {
    console.info('----');
    var postid = evt.currentTarget.dataset.postid;
    console.log('tapid is '+postid);
    var collectionList = wx.getStorageSync('collectionList');
    var num = wx.getStorageSync('num');
    // 获取文章收藏状态
    var collectionStatus = collectionList[postid];
    // 文章收藏状态切换
    collectionStatus = !collectionStatus;
    collectionStatus? (num[postid].like += 1): (num[postid].like -= 1);
    wx.setStorageSync('num', num);
    console.info(num);
    // 存储文章收藏状态
    collectionList[postid] = collectionStatus;
    wx.setStorageSync('collectionList', collectionList);
    console.info(parseInt(postid));
    this.data.postList[parseInt(postid)].collectionStatus = collectionList[postid];
    this.setData({
      postList: this.merageArr(postsData.postList, collectionList,num)
    })
    console.info(collectionStatus);
    console.info('点击事件', this.data.postList);
  },
  merageArr:function(arr,obj,num){
    // 将收藏状态加入到数据列表中,降低时间复杂度；
    var afterArr=arr.map((item,index)=>{
      if(!obj[item.postid]){
        item.collectionStatus = false;
      }else{
        item.collectionStatus = obj[item.postid];
      }
      item.collection = num[item.postid].like;
      item.reading = num[item.postid].read;
      return item;
    })
    return afterArr;
  }
})