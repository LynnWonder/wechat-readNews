Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onLikeTap: function (evt) {
    console.info('----');
    var postid = evt.currentTarget.dataset.postid;
    // console.log('tapid is '+postid);
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    })
  }
})