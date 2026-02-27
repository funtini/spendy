import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface SparkLineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  gradientId?: string;
}

export const SparkLine: React.FC<SparkLineProps> = ({
  data,
  width = 80,
  height = 32,
  color = '#4DFFA0',
  gradientId = 'sparkGradient',
}) => {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const stepX = width / (data.length - 1);
  const padding = 4;
  const innerHeight = height - padding * 2;

  const points = data.map((val, i) => ({
    x: i * stepX,
    y: padding + innerHeight - ((val - min) / range) * innerHeight,
  }));

  // Build line path
  const linePath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  // Build area path (close to bottom)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity="0.25" />
          <Stop offset="1" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path d={areaPath} fill={`url(#${gradientId})`} />
      <Path d={linePath} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </Svg>
  );
};
