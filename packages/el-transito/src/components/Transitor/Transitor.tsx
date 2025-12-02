import { FC } from 'react';

import { TransitorChanger } from '../TransitorChanger';
import { ITransitorProps } from './Transitor.types';
import { useTransitorViewModel } from './Transitor.viewModel';

export const Transitor: FC<ITransitorProps> = (props) => {
  const { children, animateWidth, animateHeight, duration } = props;
  const viewModel = useTransitorViewModel({
    children,
  });

  return (
    <TransitorChanger
      items={viewModel.items}
      activeKey={viewModel.activeKey}
      duration={duration}
      animateWidth={animateWidth}
      animateHeight={animateHeight}
    />
  );
};
