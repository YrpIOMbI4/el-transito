import { CSSProperties } from 'react';

import { AnimationStage } from '../../constants';
import { ITransitorElementSizes } from './TransitorChanger.types';

interface IGetRootStylesParams {
  animationStage: AnimationStage;
  animateWidth?: boolean;
  animateHeight?: boolean;
  duration: number;
  rootSizes: ITransitorElementSizes | null;
}

export function getRootStyles(params: IGetRootStylesParams): CSSProperties {
  const { animationStage, animateWidth, animateHeight, duration, rootSizes } = params;
  const res = {
    '--animation-duration': `${duration}ms`,
  } as CSSProperties;

  let heightValue = !animateHeight ? '100%' : undefined;
  let widthValue = !animateWidth ? '100%' : undefined;

  if (animationStage === AnimationStage.Idle) {
    res.width = widthValue;
    res.height = heightValue;
    return res;
  }

  if (animateWidth) {
    widthValue = rootSizes ? `${rootSizes.width}px` : widthValue;
    res.overflowX = 'hidden';
  }

  if (animateHeight) {
    heightValue = rootSizes ? `${rootSizes.height}px` : heightValue;
    res.overflowY = 'hidden';
  }

  res.width = widthValue;
  res.height = heightValue;

  return res;
}
