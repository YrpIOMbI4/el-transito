import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AnimationStage } from '../../constants';
import { ITransitorElementSizes } from '../../interfaces';
import { TimerManager } from '../../modules/TimerManager';
import {
  ITransitorChangerViewModel,
  ITransitorChangerViewModelParams,
} from './TransitorChanger.types';
import { getNodeSizes } from './TransitorChanger.utils';

export const useTransitorChangerViewModel = (
  params: ITransitorChangerViewModelParams
): ITransitorChangerViewModel => {
  const { activeKey, items, duration, animateOnFirstRender } = params;
  const [animationStage, setAnimationStage] = useState<AnimationStage>(AnimationStage.Idle);
  const { current: waitManager } = useRef(new TimerManager());

  const getItem = useCallback(
    (key: string) => {
      return items.find((item) => item.key === key) ?? null;
    },
    [items]
  );

  const rootRef = useRef<HTMLElement>(null);
  const currentElementRef = useRef<HTMLElement>(null);
  const isInitiallyRendered = useRef(animateOnFirstRender);
  const prevActiveKey = useRef(activeKey);
  const prevChildrenRef = useRef<ReactNode | null>(null);
  const currentChildrenRef = useRef<ReactNode | null>(getItem(activeKey)?.snapshot);
  const rootSizesRef = useRef<ITransitorElementSizes | null>(null);

  const idleActiveKey = useMemo((): string => {
    if (animationStage === AnimationStage.Initial) {
      prevActiveKey.current = activeKey;
    }
    return prevActiveKey.current;
  }, [animationStage]);

  const idleChildren = useMemo(() => {
    return getItem(idleActiveKey)?.children;
  }, [idleActiveKey, getItem]);

  const onInitialStage = () => {
    rootSizesRef.current = getNodeSizes(rootRef?.current);
    prevChildrenRef.current = getItem(prevActiveKey.current)?.snapshot || null;
    prevActiveKey.current = activeKey;
    setAnimationStage(AnimationStage.Initial);
  };

  const onBeforeEnterStage = () => {
    currentChildrenRef.current = getItem(activeKey)?.snapshot || null;
    setAnimationStage(AnimationStage.BeforeEnter);
  };

  const onEnteringStage = () => {
    setAnimationStage(AnimationStage.Entering);
    rootSizesRef.current = getNodeSizes(currentElementRef?.current);
  };

  const onEnteredStage = () => {
    setAnimationStage(AnimationStage.Entered);
  };

  const onIdleStage = () => {
    rootSizesRef.current = null;
    setAnimationStage(AnimationStage.Idle);
  };

  const handleActiveKeyChanged = async (): Promise<void> => {
    waitManager.cancelAll();
    onInitialStage();
    await waitManager.wait().then(onBeforeEnterStage);
    await waitManager.wait().then(onEnteringStage);
    await waitManager.wait(duration).then(onEnteredStage);
    await waitManager.wait().then(onIdleStage);
  };

  useEffect(() => {
    if (!isInitiallyRendered.current) {
      isInitiallyRendered.current = true;
      return;
    }
    handleActiveKeyChanged();
  }, [activeKey]);

  useEffect(() => {
    return () => {
      waitManager.cancelAll();
    };
  }, []);

  return {
    idleChildren,
    currentChildren: currentChildrenRef.current,
    prevChildren: prevChildrenRef.current,
    animationStage,
    rootRef,
    currentElementRef,
    rootSizes: rootSizesRef.current,
  };
};
