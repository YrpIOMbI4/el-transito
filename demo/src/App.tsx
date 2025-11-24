import { useState } from 'react';
import { TransitorChanger, TransitorElement, Transitor } from '@sdrobot/el-transito';
import styles from './App.styles.m.css';

export function App() {
  const [activeKey, setActiveKey] = useState<string>('one');
  const [activeKey2, setActiveKey2] = useState<string>('one2');
  const [value, setValue] = useState<string>('');
  return (
    <div>
      <button onClick={() => setActiveKey((key) => (key === 'one' ? 'two' : 'one'))}>change</button>
      <Transitor duration={500} animateOnFirstRender>
        <TransitorElement id="one" when={activeKey === 'one'}>
          <div style={{ width: '300px', height: '400px', backgroundColor: 'red' }}>Kuku</div>
        </TransitorElement>
        <TransitorElement id="two" when={activeKey === 'two'}>
          <div className={styles.second}>
            Two
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <h3>{value}</h3>
          </div>
        </TransitorElement>
      </Transitor>

      <button onClick={() => setActiveKey2((key) => (key === 'one2' ? 'two2' : 'one2'))}>
        change
      </button>
      <div className={styles.popup}>
        <Transitor animateWidth={false}>
          <TransitorElement id="one2" when={activeKey2 === 'one2'}>
            <div style={{ width: '100%' }}>
              pfijwijfiowj fwijfoiwjf iowj foiwjfiojw efojweiof wofijweoifjwe oifwoijfwoif
              jweoifjwoifjweoif
            </div>
          </TransitorElement>
          <TransitorElement id="two2" when={activeKey2 === 'two2'}>
            <div style={{ width: '100%' }}>woiefjowiejf oweofjiweoifj weoifw</div>
          </TransitorElement>
        </Transitor>
      </div>
    </div>
  );
}
