import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import home from '../screens/home'
import explore from '../screens/explore'
import postImage from '../screens/postImage'
import editProfile from '../screens/editProfile'


const MainTab = createAppContainer(createMaterialTopTabNavigator({
    home: {
        screen: home,
        navigationOptions: {
            tabBarIcon: <FaIcon name="home" size={24} />
        }
    },
    explore: {
        screen: explore,
        navigationOptions: {
            tabBarIcon: <FaIcon name="search" size={24} />
        }
    },
    post: {
        screen: postImage,
        navigationOptions: {
            tabBarIcon: <FaIcon name="plus" size={24} />
        }
    },
    editProfile: {
        screen: editProfile,
        navigationOptions: {
            tabBarIcon: <FaIcon name="user" size={24} />
        }
    }
},
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            indicatorStyle: {
                position: 'absolute', top: 0, backgroundColor: 'black'
            },
            style: {
                backgroundColor: 'white', borderTopWidth: 0.1, borderColor: '#eaeaeaea'
            }
        }
    }
))
export default MainTab