import { CSSProperties, FC, RefObject, useMemo } from 'react';

import classNames from 'classnames';

import { AnimationStage, TRANSITION_DEFAULT_DURATION } from '../../constants';
import styles from './TransitorChanger.styles.m.css';
import { ITransitorChangerProps } from './TransitorChanger.types';
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

  const rootStyles = useMemo(() => {
    const res = {
      '--animation-duration': `${duration}ms`,
      overflowX: animateWidth ? 'hidden' : 'visible',
      overflowY: animateHeight ? 'hidden' : 'visible',
    } as CSSProperties;

    if (viewModel.rootSizes && animateWidth) {
      res.width = `${viewModel.rootSizes.width}px`;
    } else if (!animateWidth) {
      res.width = `100%`;
    }

    if (viewModel.rootSizes && animateHeight) {
      res.height = `${viewModel.rootSizes.height}px`;
    } else if (!animateHeight) {
      res.height = `100%`;
    }

    return res;
  }, [viewModel.rootSizes, animateWidth, animateHeight, duration]);

  return (
    <div
      style={{ ...rootStyles }}
      ref={viewModel.rootRef as RefObject<HTMLDivElement>}
      className={rootClassName}
    >
      {viewModel.prevChildren && (
        <div className={styles.prevChildren}>{viewModel.prevChildren}</div>
      )}
      <div
        ref={viewModel.currentElementRef as RefObject<HTMLDivElement>}
        className={styles.currentChildren}
      >
        {viewModel.animationStage === AnimationStage.Idle
          ? viewModel.idleChildren
          : viewModel.currentChildren}
      </div>
    </div>
  );
};
