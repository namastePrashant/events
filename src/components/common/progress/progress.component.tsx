import React from 'react';
import { Progress } from 'antd';
import { defaultFunctionColors } from '../../../constants/colorPalette.constant';

interface ProgressComponentInterface {
  strokeColor?: any
  percent?: number
  format?: any
  className?: any
}

const ProgressComponent: React.FC<ProgressComponentInterface> = (props) => {
  const { strokeColor, percent, format, className } = props;
  return (
    <div>
      <Progress
        strokeColor={strokeColor ?? {
          '0%': defaultFunctionColors?.color1,
          '100%': defaultFunctionColors?.color2,
        }}
        percent={percent ?? 75}
        type="circle"
        width={75}
        strokeWidth={8}
        format={() => format ?? ""}
        className={className}
      />
    </div>
  )
}

export default ProgressComponent;
