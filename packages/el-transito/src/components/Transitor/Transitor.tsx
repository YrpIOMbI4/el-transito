import { TransitorChanger } from '../TransitorChanger';
import { FC } from 'react';
import { ITransitorProps } from './Transitor.types';
import { useTransitorViewModel } from './Transitor.viewModel';

export const Transitor: FC<ITransitorProps> = (props) => {
  const { children, animateWidth, animateHeight, duration } = props;
  const viewModel = useTransitorViewModel({
    children,
  });

  return (
    <TransitorChanger
      as={111}
      items={viewModel.items}
      activeKey={viewModel.activeKey}
      duration={duration}
      animateWidth={animateWidth}
      animateHeight={animateHeight}
    />
  );
};
