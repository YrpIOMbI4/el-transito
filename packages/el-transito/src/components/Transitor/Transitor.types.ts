import { CSSProperties, JSX } from 'react';

import {
  ITransitorChangerProps,
  TTransitorChangerItem,
} from '../TransitorChanger/TransitorChanger.types';
import { TTransitorElementType } from '../TransitorElement';

export type TTransitorChildren = React.ReactElement<any, TTransitorElementType>;

export interface ITransitorProps extends Pick<
  ITransitorChangerProps,
  'duration' | 'animateWidth' | 'animateHeight' | 'animateOnFirstRender'
> {
  children?: TTransitorChildren[] | TTransitorChildren;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

export interface ITransitorViewModel {
  items: TTransitorChangerItem[];
  activeKey: string;
}

export interface ITransitorViewModelParams extends Pick<ITransitorProps, 'children'> {}
