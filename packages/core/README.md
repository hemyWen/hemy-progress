<div align='center'>
<img src="https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/logo.png" /> 
  <h1>hemy-progress在JS中使用</h1>
</div>
 <hr />

## 文档
[Home](https://github.com/hemyWen/hemy-progress)

 - [JS](https://github.com/hemyWen/hemy-progress/tree/master/packages/core)
 - [React](https://github.com/hemyWen/hemy-progress/tree/master/packages/react)
 - [Vue](https://github.com/hemyWen/hemy-progress/tree/master/packages/vue)

## 安装
通过npm
```js
npm install hemy-progress
 ```
 ## 基本使用

 ```html
<div id='progress'></div>
```
```js
import hemyProgress from 'hemy-pregress'
```
type:String和percentage:Number必填 
type支持以下值
- line 线条
- circle 环形
- rect 矩形
- ellipse 椭圆
- path 自定义图形,d值必填

```js
new hemyProgress('#progress',{
  type:'circle',
  percentage:60
})
```
## 自定义图形大小颜色配置

- strokeWidth,backStrokewidth  进度条和背景的宽度
- strokeColor,backStrokeColor  进度条和背景的颜色
- fillColor: 填充颜色
- textStyle: 显示文字的样式
- lineHeight:  type=line时,进度条高度
- radius:  type=circle时,circle的半径大小
- borderRadius: type=line,rect时的圆角大小
- 
更多请查看[API使用介绍](#instructions)

```js
new hemyProgress('#progress', {
    type: 'circle',
    percentage: 50,
    strokeColor: 'red',
    fillColor: '#D7BDE2',
    backStrokeColor: '#F5EEF8 ',
    radius: 80,
    strokeWidth: 20,
    backStrokeWidth: 20,
    strokeLinecap: 'round',
    textStyle: { fontSize: '20px', color: 'green' }
})

```
进度条颜色可传入一个颜色数组 如 strokeColor=['green','blue','yellow','orange','red'],在进度0-20,20-40,40-60,60-80,80-100时分别显示'green','blue','yellow','orange','red'
- 调用实例的<font color='red'>setProgress</font>方法,参数为一个object,重新设置当前进度条样式
```js
const progress = new hemyProgress('#progress', {
    type: "line",
    percentage: 20,
    strokeColor: ['green', 'blue', 'yellow', 'orange', 'red'],
    borderRadius: 20,
})
progress.setProgress({percentage:80})
```


## 虚线样式
- isDashed:Boolean 开启虚线
- dashedLength:Number 虚线长度
- dashedDistance:Number 虚线间隔

<font color='red'>当type为line时,虚线需要设置合适虚线长度和虚线间隔,以便最后一个虚线刚好落在容器的最后面,例:虚线宽度和间隔都为5px,则进度条(容器)总宽度可以设为105px 115px 125px...
</font> 

```js
new hemyProgress('#progress', {
    type: 'circle',
    percentage: 50,
    strokeWidth: 20,
    backStrokeWidth: 20,
    isDashed: true
})
  
```
## 自定义图形
- type=path
- d值必填
- pathLength 自定义图形路径的总长度,如果存在，路径将进行缩放，以便计算各点相当于此值的路径长度

```js
new hemyProgress('#progress', {
    type: 'path',
    percentage: 50,
    showText: false,
    strokeWidth: 20,
    backStrokeWidth: 20,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeColor: 'blue',
    pathLength: 800,
    d: 'm20.74,153.83019l75.9583,-69.50019l0,34.75l110.08345,0l0,-34.75l75.95827,69.50019l-75.95827,69.49982l0,-34.74991l-110.08345,0l0,34.74991l-75.9583,-69.49982z'
})
```

## 自定义显示内容(插槽)
- 以属性slot值方式传入
```js
new hemyProgress('#progress', {
    type: 'circle',
    percentage: 50,
    strokeWidth: 20,
    backStrokeWidth: 20,
    radius: 60,
    strokeColor: '#641E16',
    strokeLinecap: 'round',
    slot: `
    <div style="text-align:center">
    <img src='lufei.png' style="width:100%;height:100%;border-radius:100%"></img>
   </div>
    `
})

```

## API使用介绍
<div id='instructions'></div>
<table>
  <tr>
    <th>表格</th>
    <th>值类型</th>
    <th>是否必填</th>
    <th>描述</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>否</td>
    <td>进度条类型,line=线条,circle=环形,ellipse=椭圆,rect=矩形,path=自定义图形</td>
    <td>line</td>
  </tr>
  <tr>
    <td>percentage</td>
    <td>Number</td>
    <td>是</td>
    <td>进度条百分比</td>
    <td>100</td>
  </tr>
    <tr>
    <td>fillColor</td>
    <td>String</td>
    <td>否</td>
    <td>闭合图形填充颜色,type!==line生效</td>
    <td>none</td>
  </tr>
   <tr>
    <td>strokeWidth</td>
    <td>Number</td>
    <td>否</td>
    <td>进度条宽度</td>
    <td>10</td>
  </tr>
   <tr>
    <td>strokeColor</td>
    <td>String,Function,Array</td>
    <td>否</td>
    <td>进度条颜色,可接受字符串,参数为percentage的函数,数组,
        ['#f56c6c','#e6a23c','#5cb87a','#1989fa','#6f7ad3']
        或者
        [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
    </td>
    <td>#409eff</td>
  </tr>
  <tr>
    <td>backStrokeColor</td>
    <td>String</td>
    <td>否</td>
    <td>背景进度条颜色</td>
    <td>#eee</td>
  </tr>
    <tr>
    <td>backStrokewidth</td>
    <td>Number</td>
    <td>否</td>
    <td>背景进度条宽度</td>
    <td>5</td>
  </tr>
   <tr>
    <td>textStyle</td>
    <td>Object</td>
    <td>否</td>
    <td>文字样式,例:{color:'red',fontSize:'25px'}</td>
    <td>{}</td>
  </tr>
  <tr>
    <td>showText</td>
    <td>Boolean</td>
    <td>否</td>
    <td>是否显示文字</td>
    <td>true</td>
  </tr>
   <tr>
    <td>format</td>
    <td>function(percentage)</td>
    <td>否</td>
    <td>自定义进度条文字内容</td>
    <td></td>
  </tr>
  <tr>
    <td>width</td>
    <td>Number</td>
    <td>否</td>
    <td>画布宽,type=path时,会自动计算画布宽高</td>
    <td>200</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Number</td>
    <td>否</td>
    <td>画布高,type=circle时,height=width</td>
    <td>200</td>
  </tr>
  <tr>
    <td>strokeLinecap</td>
    <td>String</td>
    <td>否</td>
    <td>环形条线帽,butt:正常结尾,round:圆润,square:两端为方形</td>
    <td>round</td>
  </tr>
   <tr>
    <td>strokeLinejoin</td>
    <td>String</td>
    <td>否</td>
    <td>线段连接处的样式,miter:正常连接,round:圆润,bevel:切除连接处的尖尖部分</td>
    <td>miter</td>
  </tr>
    <tr>
    <td>strokeMiterlimit</td>
    <td>Number</td>
    <td>否</td>
    <td>连接处宽度和线条宽度的比</td>
    <td>4</td>
  </tr>
  <tr>
    <td>radius</td>
    <td>Number</td>
    <td>否</td>
    <td>环形半径</td>
    <td>50</td>
  </tr>
  <tr>
    <td>isFan</td>
    <td>Boolean</td>
    <td>否</td>
    <td>是否为扇形,type=circle时生效</td>
    <td>false</td>
  </tr>
  <tr>
    <td>borderRadius</td>
    <td>Number</td>
    <td>否</td>
    <td>type=line和rect的圆角半径</td>
    <td>0</td>
  </tr>
  <tr>
    <td>rx</td>
    <td>Number</td>
    <td>否</td>
    <td>type=ellispe椭圆时的长半轴</td>
    <td>100</td>
  </tr>
  <tr>
    <td>ry</td>
    <td>Number</td>
    <td>否</td>
    <td>type=ellispe椭圆时的短半轴</td>
    <td>50</td>
  </tr>
  <tr>
    <td>pathLength</td>
    <td>Number</td>
    <td>否</td>
    <td>自定义图形路径的总长度,如果存在，路径将进行缩放，以便计算各点相当于此值的路径长度</td>
    <td>1000</td>
  </tr>
   <tr>
    <td>d</td>
    <td>String</td>
    <td>否</td>
    <td>当type=path,图形的定义路径,必填</td>
    <td></td>
  </tr>
    <tr>
    <td>isDashed</td>
    <td>Boolean</td>
    <td>否</td>
    <td>进度条是否为虚线</td>
    <td>false</td>
  </tr>
    <tr>
    <td>isBackDashed</td>
    <td>Boolean</td>
    <td>否</td>
    <td>背景是否为虚线</td>
    <td>true</td>
  </tr>
     <tr>
    <td>dashedLength</td>
    <td>Number</td>
    <td>否</td>
    <td>虚线长度</td>
    <td>5</td>
  </tr>
  <tr>
    <td>dashedDistance</td>
    <td>Number</td>
    <td>否</td>
    <td>虚线间隔</td>
    <td>5</td>
  </tr>
  <tr>
    <td>isTransition</td>
    <td>Boolean</td>
    <td>否</td>
    <td>是否有过度动画</td>
    <td>true</td>
  </tr>
  <tr>
    <td>lineHeight</td>
    <td>Number</td>
    <td>否</td>
    <td>type=line时的高度</td>
    <td>30</td>
  </tr>
   <tr>
    <td>slot</td>
    <td>string</td>
    <td>否</td>
    <td>自定义显示的内容</td>
    <td></td>
  </tr>
</table>

## 实例方法
- setProgress(obj): 参数为一个对象{percentage:number,...},属性为以上[API](#instructions)所列属性,调用此方法,可重新设置当前进度条样式(重置type除外)
