import * as d3 from "d3";
import React from "react";

interface LinePlotProps {
  data?: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

// https://stackoverflow.com/questions/27026625/how-to-change-line-color-in-d3js-according-to-axis-value

const LinePlot: React.FC<LinePlotProps> = ({
  data = [0, 0],
  width = 103.77,
  height = 49.19,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0
}) => {
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data) as [number, number], [height - marginBottom, marginTop]);
  const line = d3.line<number>((_d, i) => x(i)!, y);

  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1" d={line(data)!} />
      <g fill="white" stroke="currentColor" strokeWidth="1">
        {data.map((d, i) => (<circle key={i} cx={x(i)!} cy={y(d)!} r="1" />))}
      </g>
    </svg>
  );
};

export default LinePlot;
