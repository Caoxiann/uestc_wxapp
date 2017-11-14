// pages/index/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    name:'软件工程及应用',
    room:'品学楼A313' ,
    week:'1-16周' ,
    time:'周一3-4节' ,
    teacher:'王玉林'  
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    console.log(options)
    this.setData({
      name: options.name,
      room: options.room,
      time: options.time,
      teacher: options.teacher,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})