<div align='center'>
<img src="https://raw.githubusercontent.com/hemyWen/hemy-progress/master/assets/logo.png" /> 
  <h1>hemy-progress在React中使用</h1>
</div>
 <hr />

## 文档

[Home](https://github.com/hemyWen/hemy-progress)

- [JS](https://github.com/hemyWen/hemy-progress/tree/master/packages/core)
- [React](https://github.com/hemyWen/hemy-progress/tree/master/packages/react)
- [Vue](https://github.com/hemyWen/hemy-progress/tree/master/packages/vue)
- [Vue3](https://github.com/hemyWen/hemy-progress/tree/master/packages/vue3)

## 安装

通过 npm

```
npm install @hemy-progress/react
```

## 基本使用

type:String 和 percentage:Number 必填
type 支持以下值

- line 线条
- circle 环形
- rect 矩形
- ellipse 椭圆
- path 自定义图形,d 值必填

```jsx
import HemyProgress from '@hemy-progress/react';
export default function Demo() {
  return <HemyProgress type="circle" percentage={60} />;
}
```

## 自定义图形大小颜色配置

- strokeWidth,backStrokewidth 进度条和背景的宽度
- strokeColor,backStrokeColor 进度条和背景的颜色
- fillColor: 填充颜色
- textStyle: 显示文字的样式
- lineHeight: type=line 时,进度条高度
- radius: type=circle 时,circle 的半径大小
- borderRadius: type=line,rect 时的圆角大小

更多请查看[API 使用介绍](#instructions)

```jsx
export default function Demo() {
  return (
    <HemyProgress
      type="circle"
      percentage={60}
      radius={80}
      strokeColor="red"
      fillColor="#D7BDE2"
      backStrokeColor="#F5EEF8"
      strokeWidth={20}
      backStrokeWidth={20}
      strokeLinecap="round"
      textStyle={{ fontSize: '20px', color: 'green' }}
    />
  );
}
```

进度条颜色可传入一个颜色数组 如 strokeColor=['green','blue','yellow','orange','red'],在进度 0-20,20-40,40-60,60-80,80-100 时分别显示'green','blue','yellow','orange','red'

```jsx
export default function Demo() {
  const [percentage, setPercentage] = useState(0);
  function decrease() {
    setPercentage(percentage - 10);
    if (percentage <= 0) {
      setPercentage(0);
    }
  }
  function increase() {
    setPercentage(percentage + 10);
    if (percentage >= 100) {
      setPercentage(100);
    }
  }
  return (
    <div>
      <HemyProgress
        type="circle"
        percentage={percentage}
        radius={80}
        strokeColor={['green', 'blue', 'yellow', 'orange', 'red']}
        backStrokeColor="#F5EEF8"
        strokeWidth={20}
        backStrokeWidth={20}
        strokeLinecap="round"
      />
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
```

## 虚线样式

- isDashed:Boolean 开启虚线
- dashedLength:Number 虚线长度
- dashedDistance:Number 虚线间隔

<font color='red'>当 type 为 line 时,虚线需要设置合适虚线长度和虚线间隔,以便最后一个虚线刚好落在容器的最后面,例:虚线宽度和间隔都为 5px,则进度条(容器)总宽度可以设为 105px 115px 125px...
</font>

```jsx
export default function Demo() {
  return (
    <div style={{ width: '205px' }}>
      <HemyProgress type="line" percentage={60} isDashed={true} borderRadius={20} />
    </div>
  );
}
```

## 自定义图形

- type=path
- d 值必填
- pathLength 自定义图形路径的总长度,如果存在，路径将进行缩放，以便计算各点相当于此值的路径长度

```jsx
export default function Demo() {
  return (
    <HemyProgress
      type="path"
      percentage={60}
      d="m79.41006,31.57006l-10.63746,0c0,0 -8.2736,-0.70702 -10.63746,8.48402c-4.2107,6.62803 -12.07794,3.7117 -14.18325,6.36297c-2.32697,0 -7.68263,1.23723 -7.09167,4.24192c0.59097,3.00478 2.36394,3.53499 1.7729,4.24201c-0.59097,0.70702 -2.21614,15.2005 13.29684,14.84699c0,0 1.62517,4.24192 8.86456,0c0,0 1.6251,-1.59074 4.4322,1.06043c2.80718,2.65127 8.42132,4.59552 9.75105,4.24201c1.32965,-0.35351 9.75097,16.79115 9.75097,41.35929c0,24.56824 11.37622,41.5361 15.06974,42.41991c0,0 8.97531,34.20096 9.30773,64.69021c0,0 2.21614,12.90274 -7.53483,12.72594c-5.26331,5.23622 -7.59028,8.81539 -4.43228,8.48402c0,0 1.2189,2.38602 3.54579,2.12096c1.00765,-0.43052 -8.14428,7.82118 -4.43228,7.42349c0,0 1.62525,5.65595 7.97807,2.12096c0,0 9.75105,1.06053 10.63746,-6.36297c0.88649,-7.42349 1.32973,-19.48659 5.31877,-18.02847c0,0 0.59089,-59.21097 5.31869,-63.62968c0,0 23.48477,2.31924 50.52791,-16.96795c7.68263,-5.47924 15.51291,-13.60975 16.84256,5.30244c1.32973,18.9122 25.11623,34.64291 28.36658,45.6013c3.25035,10.95849 5.02325,7.06999 4.4322,32.87537c0,0 -5.61413,-1.59074 -9.75097,4.24201c-2.65938,3.18148 0.88649,3.18148 0.88649,3.18148c0,0 -2.06842,2.47447 4.43228,2.12105c0,0 0.88641,1.19296 5.31869,0c0,0 7.38711,0.53022 6.20518,-6.36297c0,0 0.44324,-39.23843 2.65938,-37.11738c2.21614,2.12096 13.59229,14.49339 13.29677,41.35929c0,0 -5.02325,0.88372 -5.31869,7.42349c0,0 -2.51158,3.35819 0.88641,4.24201c0,0 4.76469,1.45812 6.20518,0c0,0 6.05753,2.47447 6.20518,-6.36306c0.14772,-8.83744 -4.87545,-39.5034 -2.65931,-46.66174c0,0 -19.05878,-13.25625 -22.1614,-54.08532c0,0 8.86456,34.64291 37.23114,28.63336c0,0 2.06842,-1.06043 -0.88649,-2.12096c-2.95491,-1.06053 -26.29816,2.65127 -31.91238,-31.81484c-4.09987,-24.6566 -0.99724,-27.30777 -14.18325,-37.11738c-17.72905,-20.28196 -61.90406,0.17671 -75.34854,-6.36297c-12.41036,-7.42349 -12.8536,-7.55603 -26.59361,-12.72594c-14.0725,-8.88171 -11.67159,-19.08891 -22.16133,-32.87537c-8.03353,-12.92478 -8.1258,-11.4887 -8.86456,-12.72594c-0.73877,-1.23733 -0.14772,-7.06999 -9.75097,-8.48402z"
      pathLength={800}
      strokeLinecap="round"
      strokeLinejoin="round"
      showText={false}
    />
  );
}
```

## 自定义显示内容(插槽)

- 以属性 slot 值方式传入

```jsx
const slot = (
  <div style={{ textAlign: 'center' }}>
    {/* <i className="fa fa-user-circle fa-lg"></i> */}
    <img src="./assets/react.png" style={{ width: '30%', height: '30%' }} />
  </div>
);
export default function Demo() {
  return <HemyProgress type="circle" percentage={60} slot={slot} />;
}
```

## API 使用介绍

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
    <td>node</td>
    <td>否</td>
    <td>自定义显示的内容</td>
    <td></td>
  </tr>
</table>
