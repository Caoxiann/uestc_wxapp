// pages/cehngji/chengji.js
var wxCharts = require('wxcharts-min.js');
var app = getApp();
var lineChart = null;
var columnChart = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"请登录",
    num:"",
    semesters: ["第一学期", "第二学期"],
    all_scores: [
      [{ name: "111", credit: "4", score: "85", gpa: "4.0" },
      { name: "111112312312", credit: "4", score: "85", gpa: "4.0" },
      { name: "111112312312", credit: "4", score: "85", gpa: "4.0" },
      ],
      [{ name: "222", credit: "4", score: "85", gpa: "4.0" },
        { name: "222", credit: "4", score: "85", gpa: "4.0" },
        { name: "222", credit: "4", score: "85", gpa: "4.0" },]
      ],
    table_data : []
  },

  //成绩走向
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  columnTouchHandler: function(e){
    columnChart.scrollStart(e)
  },
  moveHandler: function (e){
    columnChart.scroll(e)
  },

  touchEndHandler: function(e){
    columnChart.scrollEnd(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync("update_scores", true)
  },

  get_avg_data: function(){
    var scores = wx.getStorageSync('scores');
    console.log(scores)
    var names = []
    var GPAs = []
    var avgScores = []
    var credits = []
    var restudy = []
    
    var avg_GPA = 0
    var avg_score = 0
    var sum_credits = 0

    for (var index in scores) {
      var data = scores[index]
      names[index] = data[0][0]
      GPAs[index] = 0
      avgScores[index] = 0
      credits[index] = 0

      var weights = 0
      for (var i in data) {
        var course = data[i]
        if (course[3] == null) continue
        if(course[8] == "优秀")course[8] = 85
        if(course[8] == "及格")course[8] = 75
        if(course[8] == "不及格")course[8] = 59
        if (course[8] == "A") course[8] = 85
        if (course[8] == "B") course[8] = 75
        if (course[8] == "C") course[8] = 60
        if (course[8] == "D") course[8] = 50
        GPAs[index] += parseFloat(course[5]) * parseFloat(course[9])
        avgScores[index] += parseFloat(course[5]) * parseFloat(course[8])
        credits[index] += parseFloat(course[5])
        weights += parseFloat(course[5])

      }
      GPAs[index] = GPAs[index] / weights
      avgScores[index] = avgScores[index] / weights

      avg_GPA += GPAs[index]
      avg_score += avgScores[index]
      sum_credits += credits[index]
    }

    avg_GPA = avg_GPA / GPAs.length
    avg_score = avg_score / avgScores.length

    var data = {
      names: names,
      GPAs: GPAs,
      avg_GPA: avg_GPA,
      avgScores: avgScores,
      avg_score: avg_score,
      credits: credits,
      sum_credits: sum_credits,
    }
    console.log(data)
    return data
  },

  get_pie_chart_data: function (data) {
    var names = data.names
    var GPAs = []
    var avgScores = []
    var credits = []

    for (var index in names) {
      var name = names[index]
      GPAs[index] = {
        name: name,
        data: data.GPAs[index],
        stroke: false,
      }
      avgScores[index] = {
        name: name,
        data: data.avgScores[index],
        stroke: false,
      }
      credits[index] = {
        name: name,
        data: data.credits[index],
        stroke: false,
      }
    }

    var pie_chart_data = {
      GPAs: GPAs,
      avg_GPA: data.avg_GPA,
      avgScores: avgScores,
      avg_score: data.avg_score,
      credits: credits,
      sum_credits: data.sum_credits,
    }

    console.log(pie_chart_data)
    return pie_chart_data;
  },

  get_line_chart_data: function (data) {
    var GPAs = []
    var categories = []

    for (var index in data.GPAs){
      GPAs[index] = data.GPAs[index] * 25
    }
    for (var i in data.names){
      categories[i] = '第' + (parseInt(i)+1).toString() + '学期'
    }
    return{
      categories: categories,
      gpa_data: GPAs,
      score_data: data.avgScores,
    }
  },

  create_gpa_chart: function(GPAs, avg_GPA){
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;

    var series = GPAs.length ? GPAs : this.get_tmp_series()
    var text = avg_GPA ? avg_GPA.toFixed(2).toString() : "99"

    var gpaChart = new wxCharts({
      animation: true,
      canvasId: 'gpaCanvas',
      type: 'ring',

      title: {
        name: text,
        color: '#7cb5ec',
        fontSize: 18
      },
      subtitle: {
        name: 'GPA',
        color: '#666666',
        fontSize: 12
      },
      series: series,
      disablePieStroke: true,
      width: windowWidth / 3,
      height: windowWidth / 3,
      dataLabel: false,
      legend: false,
      //background: '#f5f5f5',
      padding: 0
    });
  },

  create_avg_chart: function(avgScores, avg_score){
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;

    var serise = avgScores.length? avgScores : this.get_tmp_series()
    var text = avg_score? avg_score.toFixed(1).toString() : "99"

    console.log()
    var avgChart = new wxCharts({
      animation: true,
      canvasId: 'avgCanvas',
      type: 'ring',

      title: {
        name: text,
        color: '#7cb5ec',
        fontSize: 18
      },
      subtitle: {
        name: '平均分',
        color: '#666666',
        fontSize: 12
      },
      series: serise,
      disablePieStroke: true,
      width: windowWidth / 3,
      height: windowWidth / 3,
      dataLabel: false,
      legend: false,
      // background: '#f5f5f5',
      padding: 0
    });
  },

  create_credit_chart: function(credits, sum_credits){
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;

    var serise = credits.length ? credits : this.get_tmp_series()
    var text = sum_credits ? sum_credits.toFixed(1).toString() : "99"

    var credit_chart = new wxCharts({
      animation: true,
      canvasId: 'allCanvas',
      type: 'ring',

      title: {
        name: text,
        color: '#7cb5ec',
        fontSize: 18
      },
      subtitle: {
        name: '总学分',
        color: '#666666',
        fontSize: 12
      },
      series: serise,
      disablePieStroke: true,
      width: windowWidth / 3,
      height: windowWidth / 3,
      dataLabel: false,
      legend: false,
      //background: '#f5f5f5',
      padding: 0
    });

  },

  get_tmp_series: function(){
    var series = [{
      name: 'term1',
      data: 24,
      stroke: false
    }, {
      name: 'term2',
      data: 25,
      stroke: false
    }, {
      name: 'term3',
      data: 23,
      stroke: false
    }, {
      name: 'term4',
      data: 21,
      stroke: false
    }]
    return series
  },

  createSimulationData: function () {
    var categories = [];
    var score_data = [82, 83, 85, 86];
    var gpa_data = [100, 85, 78, 92];
    for (var i = 0; i < 4; i++) {
      categories.push('term-' + (i + 1));
    }
    return {
      categories: categories,
      score_data: score_data,
      gpa_data: gpa_data,
    }
  },
  
  create_line_chart: function(line_data){
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;

    var data = line_data.categories.length ? line_data : this.createSimulationData();
    console.log(line_data)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: data.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: 'GPA',
        data: data.gpa_data,
        format: function (val, name) {
          return (val/25).toFixed(2);
        }
      }, {
        name: '平均分',
        data: data.score_data,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  get_restudy_data: function(){
    var data = wx.getStorageSync('scores');
    var d = {name:"d", weight:0}
    var restudy = [d, d, d, d, d]
    var compare = function (prop) {
      return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop]; if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
    }
    for (var index in data){
      for (var i in data[index]){
        var course = data[index][i]
        if (course[3] == null) continue
        var weight = (4.0 - parseFloat(course[9])) * parseFloat(course[5])
        if (weight >= restudy[4].weight){
          restudy[4] = {name: course[3], weight: weight}
          restudy.sort(compare("weight"))
        }
      }
    }
    var names = []
    var weights = []
    for (var i in restudy){
      names.push(restudy[i].name)
      weights.push(restudy[i].weight)
    }
    return {
      categories: names,
      data: weights,
    }
  },

  get_tmp_restudy_data(){
    return {
        data: [15, 12, 10, 10, 8],
        categories: ['微积分', '数学建模', 'c语言', '线性代数', '政治经济学']
    }
  },

  create_restudy_chart: function(restudy_data){
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var data = restudy_data.categories[0] != "d" ? restudy_data: this.get_tmp_restudy_data()
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: data.categories,
      series: [{
        name: '推荐指数:(4.0-绩点)*学分',
        data: data.data,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        min: 0
      },

      extra: {
        column: {
          width: 30,
        }
      },
      width: windowWidth,
      height: 300,
    });
  },

  set_all_semester_scores: function(){
    var scores = wx.getStorageSync("scores")
    if (!scores){
      var all = this.data.all_scores
      this.setData({
        table_data: all[0]
      })
      return
    }
    
    var all_scores = []
    for (var index in scores){
      var semes = []
      for (var i in scores[index]){
        var course = scores[index][i]
        var c = {
          name:course[3],
          credit:course[5],
          score:course[8],
          gpa:course[9],
        }
        semes.push(c)
      }
      all_scores.push(semes)
    }
    this.setData({
      all_scores: all_scores,
      table_data: all_scores[0]
    })
    
  },

  chooseSemester: function(e){
    console.log(e)
    var all = this.data.all_scores;
    this.setData({
      table_data: all[e.target.id]
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
    var updated = wx.getStorageSync("update_scores")
    if (updated){
      var windowWidth = wx.getSystemInfoSync().windowWidth;
      var windowHeight = wx.getSystemInfoSync().windowHeight;

      var data = this.get_avg_data()
      var pie_chart_data = this.get_pie_chart_data(data)
      var line_data = this.get_line_chart_data(data)
      var restudy_data = this.get_restudy_data()

      this.create_gpa_chart(pie_chart_data.GPAs, pie_chart_data.avg_GPA)
      this.create_avg_chart(pie_chart_data.avgScores, pie_chart_data.avg_score)
      this.create_credit_chart(pie_chart_data.credits, pie_chart_data.sum_credits)
      this.create_line_chart(line_data)
      this.create_restudy_chart(restudy_data)

      this.set_all_semester_scores()
      
      var name = wx.getStorageSync("ch-name")
      var num = wx.getStorageSync("username")
      if (name && num)
        this.setData({
          name: name + ",",
          num: num,
        })
      wx.setStorageSync("update_scores", false)
    }
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
  updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: '成交量1',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2) + '万';
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
  },

  

})