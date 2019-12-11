import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LoginPage from './src/screens/login'
import RegisterPage from './src/screens/register'
import HomePage from './src/screens/home'
import MainStack from './src/routes/login_register_home'
import 'react-native-gesture-handler'
import reducers from './src/redux/reducers/index'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ProfileDetail from './src/screens/profileDetail'


const reduxStore = createStore(reducers)
export default class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        {/* <ProfileDetail /> */}
        <MainStack />
      </Provider>
    )
  }
}

{/* <LoginPage /> */ }
  // <RegisterPage />