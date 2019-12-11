import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Image, Avatar } from 'react-native-elements'
import { Header, Left, Right, Body, Icon, Container } from 'native-base'
import FaIcon from 'react-native-vector-icons/FontAwesome'


export default class profileDetail extends Component {
    render() {
        return (
            <View>
                <Header style={{ backgroundColor: "white" }}>
                    <Left>
                        <FaIcon
                            name='arrow-left'
                            size={20}
                            style={{ paddingRight: 15 }}
                        />
                    </Left>
                    <Body>
                        <Text style={{ fontWeight: 'bold', marginLeft: -20, fontSize: 18 }}>Username</Text>
                    </Body>
                    <Right>
                        <FaIcon
                            name='ellipsis-v'
                            size={20}
                            style={{ paddingRight: 20 }}
                        />
                    </Right>
                </Header>
                <View style={{ height: 100, flexDirection: 'row', paddingHorizontal: 15, marginTop: 15 }}>
                    <View style={{ flex: 1, }}>
                        <Avatar
                            containerStyle={{ borderWidth: 3, borderColor: '#eaeaea' }}
                            size={100}
                            rounded
                            source={{
                                uri: 'http://apiinstagrinjc.herokuapp.com/public/posts/POS1574736012131.jpeg',
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>99</Text>
                        <Text>Posts</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>2.3M</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>1</Text>
                        <Text>Following</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}> Username </Text>
                    <Text> User Bio </Text>
                </View>
                <ScrollView style={{ borderTopWidth: 1, borderTopColor: '#eaeaea', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ width: `${100 / 3}%`, height: 120, }}>
                            <Image
                                source={{ uri: 'http://apiinstagrinjc.herokuapp.com/public/posts/POS1574734597340.jpeg' }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }
}
