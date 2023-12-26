import { FC } from 'react';
import {
  calculateCalibrationValues,
  calculateCalibrationValuesGolden,
} from './1';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <h1>Advent of Code 2023</h1>
      <h2>Day 1</h2>
      <p>⭐ {calculateCalibrationValues()}</p>
      <p>🌟 {calculateCalibrationValuesGolden()}</p>
    </div>
  );
};
