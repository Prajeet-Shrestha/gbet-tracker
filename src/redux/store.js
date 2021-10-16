import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
