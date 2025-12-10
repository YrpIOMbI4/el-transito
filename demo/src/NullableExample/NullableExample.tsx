import { FC, useState } from 'react';

import { Transitor, TransitorElement } from '@sdrobot/el-transito';

import { SomeComponent } from './SomeComponent/SomeComponent';

export const NullableExample: FC = () => {
  const [Component, setComponent] = useState<FC<any> | null>(null);
  return (
    <div>
      <button
        onClick={() => {
          setComponent((s: FC<any> | null) => (s ? null : SomeComponent));
        }}
      >
        change
      </button>

      <Transitor
        duration={300}
        animateWidth={false}
        animateHeight={false}
      >
        <TransitorElement
          id="111"
          when={!Component}
        >
          {null}
        </TransitorElement>
        <TransitorElement
          id="comp"
          when={!!Component}
        >
          {Component && <Component />}
        </TransitorElement>
      </Transitor>
    </div>
  );
};
