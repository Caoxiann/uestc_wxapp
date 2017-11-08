//index.js
//获取应用实例
var app = getApp()


//获取屏幕高度
var screenHeight = wx.getSystemInfo({
  success: function (res) {
    screenHeight = res.windowHeight
  }
})

Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
      { "xqj": 1, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 2, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 3, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 4, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 5, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 6, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 7, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
    ]
  },
  courses : [],

  showdetail:function(){
    wx.navigateTo({
      url: 'detail/detail?type=2'
    })
  },
  //获取屏幕宽度
  set_screenWidth : function(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var screenWidth = res.windowWidth;
        console.log(screenWidth);
        that.setData({
          screenWidth : screenWidth,
        })
      }
  })
  },

  onLoad: function(options){
    this.set_screenWidth();
    wx.setStorageSync("update_courses", true)
  },

  onShow: function(){
    var courses = wx.getStorageSync("courses")
    var updated = wx.getStorageSync("update_courses")
    if(courses && updated){
      this.courses = courses
      var courseList = [];
      for(var index in this.courses){
          var course = this.courses[index];
          var dic = {}
          dic["xqj"] = course.time[0][0];
          dic["skjc"] = course.time[0][1];
          dic["skcd"] = course.time.length;
          dic["kcmc"] = course.course_name + "@" + course.room_name;
          courseList.push(dic);
          }
      this.setData({
        'wlist' : courseList
      });
      wx.setStorageSync("update_courses", false)
      }
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
