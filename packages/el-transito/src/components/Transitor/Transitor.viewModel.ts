import React, { Children, cloneElement, useEffect, useState } from 'react';

import { TTransitorChangerItem } from '../TransitorChanger/TransitorChanger.types';
import { TransitorElement } from '../TransitorElement';
import { ITransitorViewModel, ITransitorViewModelParams } from './Transitor.types';

export function useTransitorViewModel(params: ITransitorViewModelParams): ITransitorViewModel {
  const { children } = params;
  const [items, setItems] = useState<TTransitorChangerItem[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    const newItems: TTransitorChangerItem[] = [];
    let newActiveKey = '';

    Children.toArray(children).forEach((child) => {
      if (!React.isValidElement(child) || child.type !== TransitorElement) {
        newItems.push({
          key: 'null',
          children: null,
          snapshot: null,
        });
        return;
      }
      const key = child.props.id;
      if (child.props.when) {
        newActiveKey = key;
      }
      const prevItem = items.find((item) => item.key === key);
      const newChildren = child?.props.children ? child : prevItem?.children;
      newItems.push({
        key,
        children: child,
        snapshot: newChildren ?? null,
      });
    });

    setActiveKey(newActiveKey);
    setItems(newItems);
  }, [children]);

  return { items, activeKey };
}
