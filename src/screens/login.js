import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { onRegisterSuccess } from './../redux/actions/users'
import Axios from 'axios'
import { urlApi } from '../supports/url'
import { StackActions, NavigationActions } from 'react-navigation';

class login extends Component {
    state = {
        look: true,
        username: '',
        password: '',
        loading_btn: false
    }

    onBtnLoginClick = () => {
        console.log(this.props.bebas);

        console.log(this.state.username, this.state.password);
        this.setState({ loading_btn: true })
        const { username, password } = this.state
        if (username && password) {
            Axios.post(urlApi + 'auth/login', { username, password })
                .then((res) => {
                    if (res.data.error) {
                        return alert(res.data.message)
                    }
                    var data_login = res.data.data[0]
                    var { username, email, id } = data_login
                    AsyncStorage.setItem('data', JSON.stringify({ username, email, id }), (err) => {
                        if (err) return alert(err.message)
                        this.props.onRegisterSuccess({ username, email, id })
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            return alert('Form cannot empty')
        }
    }

    componentDidUpdate() {
        if (this.props.bebas) {
            const reset_stack = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'home' })]
            })
            this.props.navigation.dispatch(reset_stack)
        }
    }


    render() {
        return (
            <View style={{ flex: 1, marginTop: 150, paddingHorizontal: 25 }}>
                <Text h3 style={{ alignSelf: "center" }}>InstaZam</Text>
                <View style={{ marginTop: 30 }}>
                    <Input
                        onChangeText={(text) => this.setState({ username: text })}
                        placeholder='Username'
                        leftIcon={
                            <FaIcon
                                name='user'
                                size={24}
                                color='black'
                                style={{ paddingRight: 15 }}
                            />
                        }
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Input
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry={this.state.look}
                        placeholder='Password'
                        leftIcon={
                            <FaIcon
                                name='lock'
                                size={24}
                                color='black'
                                style={{ paddingRight: 15 }}
                            />
                        }
                        rightIcon={
                            <FaIcon
                                name='eye'
                                size={24}
                                color='black'
                                style={{ paddingRight: 15 }}
                                onPress={() => { this.setState({ look: !this.state.look }) }}
                            />
                        }
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                    <Button
                        onPress={this.onBtnLoginClick}
                        loading={this.state.loading_btn}
                        title="Login"
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            icon={
                                <FaIcon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            }
                            title="Outline button"
                            type="outline"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            icon={
                                <FaIcon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            }
                            title="Outline button"
                            type="outline"
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 15 }}>Dont have an Account ? </Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 15, color: '#339AF0' }} onPress={() => { this.props.navigation.navigate('register') }}>Register</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bebas: state.users.username
    }
}

export default connect(mapStateToProps, { onRegisterSuccess })(login)