import { computed, toRef, toRefs, ref } from 'vue';
export function useParams(props, context, perimeter) {
  const {
    type,
    format,
    percentage,
    textStyle,
    strokeColor,
    isDashed,
    dashedLength,
    dashedDistance,
    borderRadius,
    isTransition,
    isBackDashed,
    strokeWidth,
    showText,
  } = toRefs(props);
  const content = computed(() => {
    if (typeof format.value === 'function') {
      return format.value(percentage.value) || '';
    } else {
      return `${percentage.value}%`;
    }
  });
  //文字样式
  const svgTextStyle = computed(() => {
    return { ...textStyle.value, fill: textStyle.value.color };
  });
  //当前进度条颜色
  const currentStrokeColor = computed(() => {
    if (typeof strokeColor.value === 'function') {
      return strokeColor.value(percentage.value);
    } else if (typeof strokeColor.value === 'string') {
      return strokeColor.value;
    } else {
      return getCurrentColor(percentage.value);
    }
  });
  //虚线长度和间隙
  const strokeDasharray = computed(() => {
    if (isDashed.value) {
      return dashedLength.value + ' ' + dashedDistance.value;
    }
    return perimeter.value;
  });
  //当前进度(虚线偏移量)
  const strokeDashoffset = computed(() => {
    const dashoffset = '' + (perimeter.value * (100 - percentage.value)) / 100;
    return dashoffset;
  });
  //进度条样式
  const style = (maskID) => {
    const { strokeWidth, strokeLinecap, strokeLinejoin, radius, isFan } = toRefs(props);
    const stroke = ref(currentStrokeColor.value);
    let style = {
      stroke: stroke.value,
      strokeWidth: strokeWidth.value,
      strokeDasharray: strokeDasharray.value,
      strokeLinecap: strokeLinecap.value,
      strokeLinejoin: strokeLinejoin.value,
    };
    if (isDashed.value) {
      style['mask'] = `url(#${maskID})`;
    } else {
      style['strokeDashoffset'] = strokeDashoffset.value;
    }
    //type=circle的扇形时
    if (type.value === 'circle' && isFan.value) {
      style.strokeWidth = radius.value * 2;
      style.strokeLinecap = 'butt';
    }
    //当type=rect时
    if (type.value === 'rect') {
      style['rx'] = borderRadius.value;
      style['ry'] = borderRadius.value;
    }
    if (isTransition.value) {
      style['transition'] = 'stroke-dashoffset 0.6s ease';
    }
    return style;
  };
  //背景样式
  const backgroundStyle = computed(() => {
    const { fillColor, backStrokeColor, backStrokeWidth, strokeLinejoin, radius, isFan } = toRefs(props);
    let style = {
      fill: fillColor.value,
      strokeLinejoin: strokeLinejoin.value,
      stroke: backStrokeColor.value,
      strokeWidth: backStrokeWidth.value,
    };
    if (isDashed.value && isBackDashed.value) {
      style['strokeDasharray'] = strokeDasharray.value;
    }
    if (type.value === 'circle' && isFan.value) {
      style.strokeWidth = radius.value * 2;
    }
    //当type=rect时
    if (type.value === 'rect') {
      style['rx'] = borderRadius.value;
      style['ry'] = borderRadius.value;
    }
    return style;
  });
  //蒙版样式
  const maskStyle = computed(() => {
    const stroke = 'white';
    const strokeDasharray = perimeter.value;
    const style = { stroke, strokeDasharray, strokeDashoffset: strokeDashoffset.value, strokeWidth: strokeWidth.value };
    if (isTransition.value) {
      style['transition'] = 'stroke-dashoffset 0.6s ease';
    }
    return style;
  });

  const isShowText = computed(() => {
    const slot = context.slots.default()[0].children;
    return showText && !slot.length;
  });

  //获取当前颜色
  const getCurrentColor = (percentage: number) => {
    const colorArray = getColorArray().sort((a, b) => a.percentage - b.percentage);
    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i].percentage > percentage) {
        return colorArray[i].color;
      }
    }
    return colorArray[colorArray.length - 1].color;
  };
  //获取color数组
  const getColorArray = () => {
    const color: any = strokeColor.value;
    const span = 100 / color.length;
    return color.map((item, index) => {
      if (typeof item === 'string') {
        return {
          color: item,
          percentage: (index + 1) * span,
        };
      }
      return item;
    });
  };

  return {
    content,
    svgTextStyle,
    currentStrokeColor,
    strokeDasharray,
    strokeDashoffset,
    style,
    backgroundStyle,
    maskStyle,
    isShowText,
  };
}
