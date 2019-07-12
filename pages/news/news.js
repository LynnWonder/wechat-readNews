Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 加载数据loading
    wx.showLoading({
      title: '加载中…'
    })
    var url = "https://c.m.163.com/nc/article/headline/T1348649580692/0-40.html";
    var _this = this;
    wx.request({
      url: url,
      success: function(res) {
        console.info('res', res.data['T1348649580692'])
        _this.setData({
          newsData: res.data['T1348649580692']
        })
        // 变成对象嵌套对象
        var newsList = {}
        res.data['T1348649580692'].forEach((key) => {
          newsList[key.docid] = key;
        })
        wx.setStorage({
          key: "newsList",
          data: newsList
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        // 加载完成隐藏loading
        wx.hideLoading()
      }
    })
  },
  onTap: function(e) {
    // 涉及点：点击事件传参；catchtap不会冒泡
    console.info(e.currentTarget);
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + data.docid
    })
  }
})