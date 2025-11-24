import { FC, PropsWithChildren } from 'react';

interface ITransitorElementProps extends PropsWithChildren {
  id: string;
  when: boolean;
}

export const TransitorElement: FC<ITransitorElementProps> = (props) => {
  const { children } = props;
  return <>{children}</>;
};
