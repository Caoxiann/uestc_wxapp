// pages/cehngji/chengji.js
var wxCharts = require('wxcharts-min.js');
var app = getApp();
var lineChart = null;
var columnChart = null;
var chartData = {
  main: {
    data: [15, 12, 10, 10,8],
    categories: ['微积分', '数学建模', 'c语言', '线性代数','政治经济学']
  },
  
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"高英男",
    num:2015060501031,
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
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 4; i++) {
      categories.push('term-' + (i + 1));
      
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    
    var pie_chart_data = this.get_pie_chart_data()

    this.create_gpa_chart(pie_chart_data.GPAs, pie_chart_data.avg_GPA)
    this.create_avg_chart(pie_chart_data.avgScores, pie_chart_data.avg_score)

    var allChart = new wxCharts({
      animation: true,
      canvasId: 'allCanvas',
      type: 'ring',

      title: {
        name: '82',
        color: '#7cb5ec',
        fontSize: 20
      },
      subtitle: {
        name: '总学分',
        color: '#666666',
        fontSize: 12
      },
      series: [{
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
      }],
      disablePieStroke: true,
      width: windowWidth/3,
      height: windowWidth / 3,
      dataLabel: false,
      legend: false,
      //background: '#f5f5f5',
      padding: 0
    });

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: 'GPA',
        data: [4,3.2,2.7,3.4],
        format: function (val, name) {
          return val.toFixed(2);
        }
      }, {
        name: '平均分',
        data: [82, 83, 85, 86],
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

  get_pie_chart_data: function () {
    var scores = wx.getStorageSync('scores');
    console.log(scores)

    var GPAs = []
    var avgScores = []
    var credits = []

    var avg_GPA = 0
    var avg_score = 0
    var sum_credits = 0

    
    for (var index in scores) {
      var data = scores[index]
      GPAs[index] = {
        name: data[0][0],
        data: 0,
        stroke: false,
      }
      avgScores[index] = {
        name: data[0][0],
        data: 0,
        stroke: false,
      }
      credits[index] = {
        name: data[0][0],
        data: 0,
        stroke: false,
      }

      var weights = 0
      for (var i in data) {
        var course = data[i]
        if (course[3] == null) continue
        GPAs[index].data += parseFloat(course[5]) * parseFloat(course[9])
        avgScores[index].data += parseFloat(course[5]) * parseFloat(course[8])
        credits[index].data += parseFloat(course[5])
        weights += parseFloat(course[5])

      }
      GPAs[index].data = GPAs[index].data / weights
      avgScores[index].data = avgScores[index].data / weights

      avg_GPA += GPAs[index].data
      avg_score += avgScores[index].data
      sum_credits += credits[index].data
    }

    avg_GPA = avg_GPA / GPAs.length
    avg_score = avg_score / avgScores.length

    var pie_chart_data = {
      GPAs: GPAs,
      avg_GPA: avg_GPA,
      avgScores: avgScores,
      avg_score: avg_score,
      credits: credits,
      sum_credits: sum_credits,
    }

    console.log(pie_chart_data)
    return pie_chart_data;
  },

  create_gpa_chart: function(GPAs, avg_GPA){
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;

    var series = GPAs.lenght ? GPAs : this.get_tmp_series()
    var text = avg_GPA ? avg_GPA.toFixed(2).toString() : "99"

    var gpaChart = new wxCharts({
      animation: true,
      canvasId: 'gpaCanvas',
      type: 'ring',

      title: {
        name: text,
        color: '#7cb5ec',
        fontSize: 20
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

    var serise = avgScores.lenght? avgScores : this.get_tmp_series()
    var text = avg_score? avg_score.toFixed(1).toString() : "99"

    var avgChart = new wxCharts({
      animation: true,
      canvasId: 'avgCanvas',
      type: 'ring',

      title: {
        name: text,
        color: '#7cb5ec',
        fontSize: 20
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
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var windowWidth = wx.getSystemInfoSync().windowWidth;

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '推荐指数:(4.0-GPA)*学分',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) ;
        }
      }],
      yAxis: {
        format: function (val) {
          return val ;
        },
        min: 0
      },
      
      extra: {
        column: {
          width: 24
        }
      },
      width: windowWidth,
      height: 200,
    });
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