// pages/me/daoru/daoru.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '请输入信息门户账号及密码',
    userName: '',
    userPassword: '',
    id_token: '',//方便存在本地的locakStorage  
    response: '' ,//存取返回数据  
    url: "https://wxapp.hoynechan.cn",
    semesters_array: [],
    selected_index: 1,
    semester: '',
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  daoru: function () {
    var that = this
    console.log("daoru")
    wx.showLoading({
      title: '正在载入',
      mask:true,
    });
    wx.request({
      url: this.data.url + '/login',
      data: {
        username: this.data.userName,
        passwd: this.data.userPassword,
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200){
          wx.setStorage({
            key: 'username',
            data: that.data.userName,
          })
          wx.setStorage({
            key: 'password',
            data: that.data.userPassword,
          })
          wx.setStorage({
            key: 'ch-name',
            data: res.data,
          })
          that.get_all_score();
        }else{
          wx.hideLoading();
          wx.showModal({
            title: '登录失败',
            content: "请检查用户名和密码",
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
        console.log('login is failed')
        wx.hideLoading();
        wx.showModal({
          title: '登录失败',
          content: "网络错误",
        })
      }
    })
  } ,

  get_all_score: function(){
      var that = this;
      wx.request({
        url: this.data.url + '/getallscore?username=' + this.data.userName,
        method: 'GET',
        success: function(res){
          if(res.statusCode==200){
            console.log('Get socres success.');
            console.log(res.data);
            wx.setStorageSync('scores', res.data);
            wx.setStorageSync('update_scores', true)
            that.get_courses('2017-2018-1')
          }else{
            wx.hideLoading();
            wx.showModal({
              title: '获取成绩失败.',
              content: '请稍后再试',
            })
          }
        },
        fail: function(res){
          wx.hideLoading();
          wx.showModal({
            title: '获取成绩失败.',
            content: '网络错误',
          })
        }
      })

  },

  get_courses: function(semester){
    var that = this;
    var semester = this.data.semester
    console.log(semester)
    wx.request({
      url: this.data.url + '/getcourse?username=' + this.data.userName + '&semester=' + semester,
      method: 'GET',
      success: function (res) {
        console.log('Get courses success.')
        wx.hideLoading();
        if(res.statusCode == 200){
          wx.setStorageSync("courses", res.data)
          wx.setStorageSync('update_courses', true)
          wx.showToast({
            title: '导入成功',
            icon: 'success',
            mask: true,
          })
          setTimeout(function () {
            that.back_to_index()
          }, 1500)
        }else{
          wx.showModal({
            title: '获取课表失败.',
            content: '请稍后再试',
          })
        }
        
        
      },
      fail: function (res) {
        wx.hideLoading();
        console.log("Get course failed.")
        wx.showModal({
          title: '获取课表失败.',
          content: '网络错误',
        })
      }
  })
  },

  back_to_index: function(){
    wx.switchTab({
      url: '../../index/index',
      success: function (res) {
        console.log("Redirect success.");
      },
      fail: function (res) {
        console.log("Redirect failed.")
      }
    })
  },

  pickerChange: function(e){
    var semesters = this.data.semesters_array
    var index = e.detail.value
    this.setData({
      selected_index: index,
      semester: semesters[index]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username = wx.getStorageSync('username');
    var password = wx.getStorageSync('password');
    console.log(username)
    if(username && password){
      this.setData({
        'userName':username,
        'userPassword':password,
      })
    }
    
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var semes = 1
    if (month < 8){
      semes = 2
      year -= 1
    } 
    // var semester = year.toString() + '-' + (year+1).toString() + '-' + semes.toString()
    var i = 0
    var semesters = []
    if(month<8)i=-1
    for(i;i<5;i++){
      var y = year - i
      var semester_2 = y.toString() + '-' + (y + 1).toString() + '-2'
      var semester_1 = y.toString() + '-' + (y + 1).toString() + '-1'
      if(i!=-1)semesters.push(semester_2)
      semesters.push(semester_1)
    }
    this.setData({
      semesters_array: semesters,
      semester: semesters[1],
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