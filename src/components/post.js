import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Avatar, Image } from 'react-native-elements'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { urlApi } from '../supports/url'

export default class post extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, paddingHorizontal: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Avatar
                                rounded
                                source={{
                                    uri:
                                        `${urlApi}/public/profile/default.png`,
                                }}
                            />
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ marginLeft: 12, fontWeight: 'bold' }}>{this.props.username}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <FaIcon
                            name='ellipsis-v'
                            size={20}
                            // color='black'
                            style={{ paddingRight: 20 }}
                        />
                    </View>
                </View>
                <View>
                    <Image
                        source={{ uri: `https://apiinstagrinjc.herokuapp.com/${this.props.imageUrl}` }}
                        style={{ width: 420, height: 400 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <FaIcon
                                name='heart-o'
                                size={24}
                                color='black'
                                style={{ paddingRight: 20 }}
                                onPress={() => { this.setState({ look: !this.state.look }) }}
                            />
                        </View>
                        <View>
                            <FaIcon
                                name='comment-o'
                                size={24}
                                color='black'
                                style={{ paddingRight: 20 }}
                                onPress={() => { this.setState({ look: !this.state.look }) }}
                            />
                        </View>
                    </View>
                    <View>
                        <FaIcon
                            name='bookmark-o'
                            size={24}
                            color='black'
                            style={{ paddingRight: 15 }}
                            onPress={() => { this.setState({ look: !this.state.look }) }}
                        />
                    </View>
                </View>
                <Text style={{ paddingHorizontal: 15, fontWeight: 'bold' }}>10 Likes</Text>
                <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                    <View style={{ paddingLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.props.username}</Text>
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                        <Text>{this.props.caption}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
