
import React from 'react';
import ReactDOM from 'react-dom';

// 引入 hello.jsx
const hello = require('./hello.jsx');

// 编写一个简单的组件 
class App extends React.Component {
  render() {
    return (
      <h1 style={{color: 'red'}}>{hello}</h1>
    )
  }
};

// 创建一个组件实列，将组件挂载到元素上
ReactDOM.render(<App />, document.getElementById('app'));