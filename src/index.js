import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import store from './app/store'

import 'bootstrap/dist/css/bootstrap.min.css';
import  "react-quill/dist/quill.snow.css";
import  "react-quill/dist/quill.bubble.css";
import  "react-quill/dist/quill.core.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
              <App />
          </Provider>
      </DndProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
