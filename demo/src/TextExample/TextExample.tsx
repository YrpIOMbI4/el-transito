import { FC, useState } from 'react';

import { Transitor, TransitorElement } from '@sdrobot/el-transito';

import styles from './TextExample.styles.m.css';

export const TextExample: FC = () => {
  const [activeKey2, setActiveKey2] = useState<string>('one');
  return (
    <div>
      <button onClick={() => setActiveKey2((key) => (key === 'one' ? 'two' : 'one'))}>
        change
      </button>
      <div className={styles.popup}>
        <Transitor animateWidth={false}>
          <TransitorElement
            id="one"
            when={activeKey2 === 'one'}
          >
            <div style={{ width: '100%' }}>
              pfijwijfiowj fwijfoiwjf iowj foiwjfiojw efojweiof wofijweoifjwe oifwoijfwoif
              jweoifjwoifjweoif
            </div>
          </TransitorElement>
          <TransitorElement
            id="two"
            when={activeKey2 === 'two'}
          >
            <div style={{ width: '100%' }}>woiefjowiejf oweofjiweoifj weoifw</div>
          </TransitorElement>
        </Transitor>
      </div>
    </div>
  );
};
