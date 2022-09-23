

<div align="center">
<img src="https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/logo.png" /> 
<h2>hemy-progress</h2>
<p>基于svg制作的进度条,支持线条,环形,椭圆,矩形等其他自定义图形</p>
<table style="width:auto;display:table">
    <tr>
        <th>框架</th>
        <th>npm包</th>
        <th>安装</th>
    </tr>
    <tr>
        <td>JS</td>
        <td>
        <a href='https://www.npmjs.com/package/hemy-progress'>
        hemy-progress</a>
        </td>
        <td >npm install hemy-progress</td>
    </tr>
    <tr>
        <td>Vue</td>
        <td><a href='https://www.npmjs.com/package/@hemy-progress/vue'>@hemy-progress/vue</a></td>
        <td>npm install @hemy-progress/vue</td>
    </tr>
     <tr>
        <td>React</td>
   master/assets     <td><a href='https://www.npmjs.com/package/@hemy-progress/react'>@hemy-progress/react</a></td>
        <td>npm install @hemy-progress/react</td>
    </tr>
</table>
</div>

<hr />

## 文档
 - [JS](https://github.com/hemyWen/hemy-progress/tree/master/packages/core)
 - [React](https://github.com/hemyWen/hemy-progress/tree/master/packages/react)
 - [Vue](https://github.com/hemyWen/hemy-progress/tree/master/packages/vue)


## 常规图形
type:String 支持以下值
- line 线条
- circle 环形
- rect 矩形
- ellipse 椭圆
- path 自定义图形
![常规例子](https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/1.png)



## 自定义图形大小颜色配置
- lineHeight:  type=line时,进度条高度
- radius:  type=circle时,circle的半径大小
- strokeWidth,backStrokewidth  进度条和背景的宽度
- strokeColor,backStrokeColor  进度条和背景的颜色
- textStyle: 显示文字的样式
- isFan=true  设置为扇形,仅支持type=circle的情况

![自定义颜色配置](https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/2.png)

## 虚线样式
- isDashed:Boolean 开启虚线
- dashedLength:Number 虚线长度
- dashedDistance:Number 虚线间隔
![常规例子](https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/3.png)

<font color='red'>当type为line时,虚线需要设置合适虚线长度和虚线间隔,以便最后一个虚线刚好落在容器的最后面,例:虚线宽度和间隔都为5px,则进度条(容器)总宽度可以设为105px 115px 125px...
</font> 

### 自定义显示内容
- 自定义内容,图片,icon图标,文字等

![自定义显示内容](https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/4.png)

## 复杂图形
![复杂例子](https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/5.png)

## 复杂图形的制作
可在在线的svg制作工具上,选择或者画出想要的图形,例如: [菜鸟svg在线工具](https://c.runoob.com/more/svgeditor/)

复制源代码中最后一个d值,再设置合适的pathLength,再设置其他自己喜欢的属性值
![复杂图形制作](https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/6.gif)

## 使用
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
    <td>String</td>
    <td>否</td>
    <td>自定义显示内容,在js,react中使用生效</td>
    <td></td>
  </tr>
</table>