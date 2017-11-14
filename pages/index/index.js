//index.js
//获取应用实例
var app = getApp()
var CHINESE_NUM = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "日",
}

//获取屏幕高度
var screenHeight = wx.getSystemInfo({
  success: function (res) {
    screenHeight = res.windowHeight
  }
})

Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [],
    courses : [],
  },
  
  showdetail: function (e) {
    var index = e.currentTarget.dataset.index
    var data = this.data.wlist[index]
    var time = "周" + CHINESE_NUM[data.xqj] + " " + data.skjc.toString() + "-" + (data.skjc + data.skcd - 1).toString() + "节"
    wx.navigateTo({
      url: 'detail/detail?name=' + data.name + "&room=" + data.room + "&time=" + time + "&teacher=" + data.teacher + "&week=" + data.week
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
      this.setData({
        courses: courses,
      })
      var courseList = [];
      for(var index in courses){
          var course = courses[index];
          var dic = {}
          dic["xqj"] = course.time[0][0];
          dic["skjc"] = course.time[0][1];
          dic["skcd"] = course.time.length;
          dic["kcmc"] = course.course_name + "@" + course.room_name;
          dic["room"] = course.room_name;
          dic["name"] = course.course_name;
          dic["teacher"] = course.teacher_name;
          dic["week"] = this.get_week_string(course.weeks)
          courseList.push(dic);
          }
      this.setData({
        'wlist' : courseList
      });
      wx.setStorageSync("update_courses", false)
      }
  },
  get_week_string(weeks){
    var continuous = true
    var str = ""
    if (weeks.length == 1){
      return "第" + weeks[0] + "周"
    }
    for (var i=1;i<weeks.lenght;i++){
      if (weeks[i] - weeks[i-1] != 1){
        continuous = false
        break
      }
    }
    if (continuous) {
      str = weeks[0].toString() + "-" + weeks[weeks.length - 1].toString() + "周"
    } else {
      var odd = weeks[0] % 2 ? "单" : "双"
      str = weeks[0].toString() + "-" + weeks[weeks.length - 1].toString() + "周" + odd + "周" 
    }
    return str
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
