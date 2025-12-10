import { CSSProperties, FC, RefObject, useMemo } from 'react';

import classNames from 'classnames';

import { AnimationStage, TRANSITION_DEFAULT_DURATION } from '../../constants';
import styles from './TransitorChanger.styles.m.css';
import { ITransitorChangerProps } from './TransitorChanger.types';
import { getRootStyles } from './TransitorChanger.utils';
import { useTransitorChangerViewModel } from './TransitorChanger.viewModel';

export const TransitorChanger: FC<ITransitorChangerProps> = (props) => {
  const {
    activeKey,
    items,
    duration = TRANSITION_DEFAULT_DURATION,
    animateOnFirstRender,
    animateHeight = true,
    animateWidth = true,
  } = props;

  const viewModel = useTransitorChangerViewModel({
    activeKey,
    items,
    duration,
    animateOnFirstRender,
  });

  const rootClassName = classNames(styles.root, {
    [styles.beforeEnter]: viewModel.animationStage === AnimationStage.BeforeEnter,
    [styles.entering]: viewModel.animationStage === AnimationStage.Entering,
    [styles.entered]: viewModel.animationStage === AnimationStage.Entered,
    [styles.idle]: viewModel.animationStage === AnimationStage.Idle,
  });

  const rootStyles = useMemo((): CSSProperties => {
    return getRootStyles({
      animateHeight,
      animateWidth,
      animationStage: viewModel.animationStage,
      duration,
      rootSizes: viewModel.rootSizes,
    });
  }, [viewModel.rootSizes, animateWidth, animateHeight, duration, viewModel.animationStage]);

  return (
    <div
      style={{ ...rootStyles }}
      ref={viewModel.rootRef as RefObject<HTMLDivElement>}
      className={rootClassName}
    >
      {viewModel.animationStage !== AnimationStage.Idle && (
        <div className={styles.prevChildren}>{viewModel.prevChildren}</div>
      )}
      <div
        ref={viewModel.currentElementRef as RefObject<HTMLDivElement>}
        className={styles.currentChildren}
      >
        {viewModel.animationStage !== AnimationStage.Idle
          ? viewModel.currentChildren
          : viewModel.idleChildren}
      </div>
    </div>
  );
};
