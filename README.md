# Aragaki的课表成绩查询
 电子科大专属的课程表和学习成绩查询微信小程序  
 <div align=center><img width="150" height="150" src="https://github.com/Caoxiann/uestc_wxapp/blob/master/docs/bird.png?raw=true"/></div>  
## 状态
版本1.12已提交微信小程序平台，正在审核中...
 
## 特点
- 界面简洁美观 —— 抛弃同类产品臃肿繁琐的界面，回归最简朴的课程表工具
- 功能方便易用 —— 一键导入课程表成绩，只需信息门户账号密码，无需重新注册
- 图表直观全面 —— 多种图表全方位展示学习成绩，直观了解自己的学习情况
- 入口快捷易找 —— 基于微信小程序平台，无需下载安装，随时随地查课表

## 已完成功能
- [x] 从电子科大教务系统导入学生课程表和成绩  
	> 目前只支持本科生，研究生正在测试中
- [x] 课程详细信息展示
- [x] GPA、平均分、学分统计环形图
- [x] 历史平均分、GPA走向折线图
- [x] 各学期课程分数、绩点展示
- [x] 重修推荐科目排名柱状图

## Example
* 首次使用，打开导入页面一键导入课程表和历史成绩  
	<div align=center><img width="350" src="https://github.com/Caoxiann/uestc_wxapp/blob/master/docs/1.gif?raw=true"/></div>
* 下次使用，直接打开小程序，直接查看已导入的课表和成绩  
	<div align=center><img width="350" src="https://github.com/Caoxiann/uestc_wxapp/blob/master/docs/2.gif?raw=true"/></div>
* 点击课程表某个课程，显示课程的详细信息  
	<div align=center><img width="350" src="https://github.com/Caoxiann/uestc_wxapp/blob/master/docs/3.gif?raw=true"/></div>
* 点击成绩界面，显示各学期成绩数据  
	<div align=center><img width="350" src="https://github.com/Caoxiann/uestc_wxapp/blob/master/docs/4.gif?raw=true"/></div>
* 点击学期切换按钮，切换各学期成绩  
	<div align=center><img width="350" src="https://github.com/Caoxiann/uestc_wxapp/blob/master/docs/5.gif?raw=true"/></div>

## 更多功能请期待
* 考试时间倒计时：自动导入考试时间，对考试进行倒计时
* 考试出分推送：用户订阅某门课程后，当该门课程出分后第一时间推送给用户
* 创新学分认定：与学校教务处合作，在小程序内提交创新学分认定申请
* 挂科统计：展示所有已挂科目及重修成绩
* 设置当前周：设置当前周后，课程表中该周不上的课将用灰色背景显示，并且当前周会随时间变化自动修改

## 应用前景
在用户同意的条件下，建立一个学生课程和成绩的数据库，将大数据的分析方法应用到学生数据的分析中,分析学生成绩和所选课程、授课老师等的关系，并将有用的结论反馈给学校，作为安排课程的参考数据。

## TODO
* 计算平均分、GPA时没有处理重修成绩的情况，目前只采用第一次考试的成绩作为计算数据
* 课程表没有处理把两种课程按照单双周排列到同一天的同一时段的情况，需要改进


