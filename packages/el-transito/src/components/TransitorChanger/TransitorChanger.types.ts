import { ReactNode, RefObject } from 'react';

import { AnimationStage } from '../../constants';
import { ITransitorElementSizes } from '../../interfaces';

export type TTransitorChangerItem = {
  key: string;
  children: ReactNode;
  snapshot: ReactNode | null;
};

export interface ITransitorChangerProps {
  items: TTransitorChangerItem[];
  activeKey: string;
  duration?: number;
  animateOnFirstRender?: boolean;
  animateHeight?: boolean;
  animateWidth?: boolean;
}

export interface ITransitorChangerViewModelParams extends Pick<
  ITransitorChangerProps,
  'items' | 'activeKey' | 'animateOnFirstRender'
> {
  duration: number;
}

export interface ITransitorChangerViewModel {
  currentChildren: ReactNode;
  idleChildren: ReactNode | null;
  prevChildren: ReactNode | null;
  animationStage: AnimationStage;
  rootRef: RefObject<HTMLElement>;
  currentElementRef: RefObject<HTMLElement>;
  rootSizes: ITransitorElementSizes | null;
}
