import React, { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ITransitorViewModel, ITransitorViewModelParams } from './Transitor.types';
import { TransitorElement } from '../TransitorElement';
import { TTransitorChangerItem } from '../TransitorChanger/TransitorChanger.types';

export function useTransitorViewModel(params: ITransitorViewModelParams): ITransitorViewModel {
  const { children } = params;
  const [items, setItems] = useState<TTransitorChangerItem[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    const newItems: TTransitorChangerItem[] = [];
    let newActiveKey = '';

    console.log(Children.toArray(children));

    Children.toArray(children).forEach((child) => {
      if (!React.isValidElement(child) || child.type !== TransitorElement) {
        newItems.push({
          key: 'null',
          children: null,
        });
        return;
      }
      const key = child.props.id;
      if (child.props.when) {
        newActiveKey = key;
      }
      newItems.push({
        key,
        children: child,
      });
    });

    setActiveKey(newActiveKey);
    setItems(newItems);
  }, [children]);

  return { items, activeKey };
}
