# El-transito
## About
This lib allows making easy animated transition between elements or to appending elements.\
The common feature is to automatically get interchangeable elements sizes and smoothly animate size change.

![demo](https://github.com/YrpIOMbI4/el-transito/tree/master/shared/el-transito.gif)

## Install
```bash
  yarn add @sdrobot/el-transito
```
or
```bash
  npm install @sdrobot/el-transito
```

## Use in project

```jsx
import { useState } from 'react'
import { Transitor, TransitorElement } from "@sdrobot/el-transito";
...
const App = () => {
  const [activeKey, setActiveKey] = useState('one');
  ...
  return (
    <Transitor>
      <TransitorElement id='one' when={activeKey === 'one'}>
        <div className='one'>This is a long long text<br/>with line breaks.<br/>And thi is it</div>
      </TransitorElement>
      <TransitorElement id='two' when={activeKey === 'two'}>
        <div className='two'>I'm short one</div>
      </TransitorElement>
    </Transitor>
  )
}
```

Root component of transition is `Transitor`. It can have only `TransitorElement` children. `TransitorElement` has two required params:\
`id` - should be unique\
`when` - is a condition when to render current TransitorElement content\
## License
MIT

## Donate
### Tether USDT Tron (TRC20)
```TERf5SzjVbmXrwjTPT7Bzgie6xg3CNRXiq```
