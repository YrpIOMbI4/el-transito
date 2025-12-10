import { FC, useState } from 'react';

import { Transitor, TransitorElement } from '@sdrobot/el-transito';

import styles from './BlocksExample.styles.m.css';

export const BlocksExample: FC = () => {
  const [activeKey, setActiveKey] = useState<string>('one');
  const [value, setValue] = useState<string>('');
  return (
    <div>
      <button onClick={() => setActiveKey((key) => (key === 'one' ? 'two' : 'one'))}>change</button>
      <Transitor
        duration={600}
        animateOnFirstRender={true}
      >
        <TransitorElement
          id="one"
          when={activeKey === 'one'}
        >
          <div style={{ width: '300px', height: '400px', backgroundColor: 'red' }}>one</div>
        </TransitorElement>
        <TransitorElement
          id="two"
          when={activeKey === 'two'}
        >
          <div className={styles.second}>
            two
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <h3>{value}</h3>
          </div>
        </TransitorElement>
      </Transitor>
    </div>
  );
};
