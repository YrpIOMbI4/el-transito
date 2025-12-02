import {
  ITransitorChangerViewModelParams,
  ITransitorChangerViewModel,
  ITransitorElementSizes, TTransitorChangerItem,
} from './TransitorChanger.types';
import { AnimationStage, TIMER_MIN_DELAY } from '../../constants';
import { ReactNode, useRef, useState, useEffect, useMemo, useCallback, isValidElement, cloneElement } from 'react';

export const useTransitorChangerViewModel = (
  params: ITransitorChangerViewModelParams,
): ITransitorChangerViewModel => {
  const { activeKey, items, duration, animateOnFirstRender } = params;

  const rootRef = useRef<HTMLElement>(null);
  const currentElementRef = useRef<HTMLElement>(null);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitiallyRendered = useRef(animateOnFirstRender);

  const [idleActiveKey, setIdleActiveKey] = useState('');
  const [animationStage, setAnimationStage] = useState<AnimationStage>(AnimationStage.Idle);
  const [currentChildren, setCurrentChildren] = useState<ReactNode | null>(null);
  const [prevChildren, setPrevChildren] = useState<ReactNode | null>(null);
  const [rootSizes, setRootSizes] = useState<ITransitorElementSizes | null>(null);

  const getActiveChildren = useCallback(() => {
    return items.find((item) => item.key === idleActiveKey) ?? null;
  }, [items, idleActiveKey]);

  const idleItem = useMemo(() => getActiveChildren(), [items, idleActiveKey]);

  const changeStage = (stage: AnimationStage, timing = TIMER_MIN_DELAY): Promise<void> => {
    return new Promise<void>((resolve) => {
      animationTimerRef.current = setTimeout(() => {
        setAnimationStage(stage);
        resolve();
      }, timing);
    });
  };

  const handleActiveKeyChanged = async (): Promise<void> => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    setAnimationStage(AnimationStage.Initial);
    await changeStage(AnimationStage.BeforeEnter);
    await changeStage(AnimationStage.Entering);
    await changeStage(AnimationStage.Entered, duration);
    await changeStage(AnimationStage.Idle);
  };

  const getNodeSizes = (node: HTMLElement | null) => {
    const rect = node?.getBoundingClientRect();
    return {
      width: rect?.width || 0,
      height: rect?.height || 0,
    };
  };

  useEffect(() => {
    if (animationStage === AnimationStage.Initial) {
      setIdleActiveKey(activeKey);
      setCurrentChildren(idleItem?.snapshot);
    }
    if (animationStage === AnimationStage.BeforeEnter) {
      setCurrentChildren((prev) => {
        setPrevChildren(prev);
        const activeItem = getActiveChildren();
        return activeItem?.snapshot || null
      });
      setRootSizes(getNodeSizes(rootRef?.current));
    }
    if (animationStage === AnimationStage.Entering) {
      setRootSizes(getNodeSizes(currentElementRef?.current));
    }
    if (animationStage === AnimationStage.Entered) {
      setPrevChildren(null);
    }
    if (animationStage === AnimationStage.Idle) {
      setRootSizes(null);
    }
  }, [animationStage]);

  useEffect(() => {
    if (!isInitiallyRendered.current) {
      isInitiallyRendered.current = true;
      setIdleActiveKey(activeKey);
      return;
    }
    handleActiveKeyChanged();
  }, [activeKey]);

  useEffect(
    () => () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    },
    [],
  );

  return {
    idleChildren: idleItem?.children,
    currentChildren,
    prevChildren,
    animationStage,
    rootRef,
    currentElementRef,
    rootSizes,
  };
};
