import { FC } from 'react';
import {
  calculateCalibrationValues,
  calculateCalibrationValuesGolden,
} from './1';

import './style.css';
import {calculateGameIdsSum, calculateNumbersOfFewestCubes} from "./2";
import {calculateGearRatio, calculateGearRatioGolden} from "./3";

export const App: FC<{ name: string }> = ({ name }) => {
  return (
      <div>
        <h1>Advent of Code 2023</h1>
        <h2>Day 1</h2>
        <p>⭐ {calculateCalibrationValues()}</p>
        <p>🌟 {calculateCalibrationValuesGolden()}</p>
        <h2>Day 2</h2>
        <p>⭐ {calculateGameIdsSum(12, 13, 14)}</p>
        <p>🌟 {calculateNumbersOfFewestCubes()}</p>
        <h2>Day 3</h2>
        <p>⭐ {calculateGearRatio()}</p>
        <p>🌟 {calculateGearRatioGolden()}</p>
      </div>
  );
};
