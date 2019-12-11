import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Avatar, Image } from 'react-native-elements'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Axios from 'axios'
import { urlApi } from '../supports/url'
import Post from '../components/post'
const data = [
    {
        username: 'Alan Suryajana',
        url_foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgdmgiXDeDj7Osrvbdl1Ppuos_q_uCDIUZims8fBQjFzXwRoxX',
        likes: 10,
        caption: 'Ngapain Yak ?'
    }
]

export default class home extends Component {
    state = {
        profile: []
    }


    componentDidMount() {
        Axios.get(urlApi + '/post/getallpost')
            .then(res => {
                this.setState({ profile: res.data.data })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <ScrollView>
                {
                    this.state.profile.map(val => {
                        return (
                            <Post username={val.username} imageUrl={val.foto_url} caption={val.caption} />
                        )
                    })
                }
            </ScrollView>
        )
    }
}
