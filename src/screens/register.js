import React, { Component } from 'react'
import { View, AsyncStorage, ActivityIndicator } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Axios from 'axios'
import { onRegisterSuccess } from '../redux/actions/users'
import { connect } from 'react-redux'
import { urlApi } from '../supports/url'
import { StackActions, NavigationActions } from 'react-navigation';
import { GoogleSignin, statusCodes } from "@react-native-community/google-signin"
import { LoginButton, AccessToken } from 'react-native-fbsdk';
const web_client_id = "125951405130-k6m82m6ap1sgmdn51ro9upikv4haj84r.apps.googleusercontent.com"

class register extends Component {
    state = {
        look: true,
        look2: true,
        username: '',
        password: '',
        email: '',
        confirm_password: '',
        checkUsername: null,
        checkEmail: null,
        isLoading: false,
        registerLoadingBtn: false,
        check_storage: false
    }

    onBtnRegisterClick = () => {
        this.setState({ registerLoadingBtn: true })
        var { username, password, email, confirm_password } = this.state
        if (password !== confirm_password) return alert('Password Tidak Sama !')
        if (!username || !password || !email || !confirm_password) return alert('Isi form yang kosong !')
        var date = new Date()
        Axios.post(urlApi + '/auth/register', {
            username,
            email,
            password,
            created_at: `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        })
            .then(res => {
                console.log(res);
                AsyncStorage.setItem('data', JSON.stringify({ email, username }), (err) => {
                    if (err) return alert(err.message)
                    this.props.onRegisterSuccess({ email, username })
                    alert(res.data.message)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: web_client_id, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER C ONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        AsyncStorage.getItem('data')
            .then(data => {
                if (data) {
                    let objData = JSON.parse(data)
                    this.props.onRegisterSuccess(objData)
                    this.setState({ check_storage: true })
                }
                this.setState({ check_storage: true })
            }).catch(err => {
                alert(err.message)
            })
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            let email = userInfo.user.email
            let username = userInfo.user.name
            let profile_pict = userInfo.user.photo
            this.props.onRegisterSuccess({ email, username, profile_pict })
        } catch (error) {
            console.log(error);

            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //     // user cancelled the login flow
            // } else if (error.code === statusCodes.IN_PROGRESS) {
            //     // operation (e.g. sign in) is in progress already
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //     // play services not available or outdated
            // } else {
            //     // some other error happened
            // }
        }
    };

    checkAvailable = () => {
        if (this.state.username !== '') {
            Axios.post(urlApi + '/auth/check-username', {
                username: this.state.username
            }).then(res => {
                this.setState({ checkUsername: res.data.available })
            }).catch(error => {
                console.log(error);
            })
        }
        this.setState({ checkUsername: null })
    }

    emailAvailable = () => {
        if (this.state.email !== '') {
            Axios.post(urlApi + '/auth/check-email', {
                email: this.state.email
            }).then(res => {
                this.setState({ checkEmail: res.data.available })
            }).catch(error => {
                console.log(error);
            })
        }
        this.setState({ checkEmail: null })
    }

    componentDidUpdate() {
        if (this.props.bebas) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'home' })],
            });
            this.props.navigation.dispatch(resetAction);
        }
    }
    
    initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                // Some user object has been set up somewhere, build that user here
                console.log(json)
            })
            .catch(() => {
                console.log('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    render() {
        if (!this.state.check_storage) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text h2>InstaZam</Text>
                    <Text h5 style={{ marginTop: 30, marginBottom: 10 }}>Please Wait....</Text>
                    <ActivityIndicator size='small' />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, marginTop: 130, paddingHorizontal: 25 }}>
                <Text h3 style={{ alignSelf: "center" }}>InstaZam</Text>
                <View style={{ marginTop: 30 }}>
                    <Input
                        onBlur={this.checkAvailable}
                        onChangeText={(text) => { this.setState({ username: text }) }}
                        placeholder='Username'
                        leftIcon={
                            <FaIcon
                                name='user-o'
                                size={24}
                                color='black'
                                style={{ paddingRight: 15 }}
                            />
                        }
                        rightIcon={
                            this.state.checkUsername === null
                                ?
                                null
                                :
                                <FaIcon
                                    name={this.state.checkUsername ? 'check' : 'times'}
                                    size={24}
                                    color={this.state.checkUsername ? 'green' : 'red'}
                                    style={{ paddingRight: 15 }}
                                />
                        }
                    />
                </View>
                <View style={{ marginTop: 30 }}>
                    <Input
                        onBlur={this.emailAvailable}
                        onChangeText={(text) => { this.setState({ email: text }) }}
                        placeholder='E-mail'
                        leftIcon={
                            <FaIcon
                                name='envelope-o'
                                size={24}
                                color='black'
                                style={{ paddingRight: 15 }}
                            />
                        }
                        rightIcon={
                            this.state.checkEmail === null
                                ?
                                null
                                :
                                <FaIcon
                                    name={this.state.checkEmail ? 'check' : 'times'}
                                    size={24}
                                    color={this.state.checkEmail ? 'green' : 'red'}
                                    style={{ paddingRight: 15 }}
                                />
                        }
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Input
                        onChangeText={(text) => { this.setState({ password: text }) }}
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
                <View style={{ marginTop: 20 }}>
                    <Input
                        onChangeText={(text) => { this.setState({ confirm_password: text }) }}
                        secureTextEntry={this.state.look2}
                        placeholder='Confirm Password'
                        errorMessage={
                            this.state.confirm_password !== '' && this.state.password !== this.state.confirm_password ? 'Password doesnt match !' : null
                        }
                        leftIcon={
                            <FaIcon
                                name='repeat'
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
                                onPress={() => { this.setState({ look2: !this.state.look2 }) }}
                            />
                        }
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                    <Button
                        loading={this.state.registerLoadingBtn}
                        onPress={this.onBtnRegisterClick}
                        title="Register "
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <Button
                            onPress={this.signIn}
                            buttonStyle={{ backgroundColor: '#E75A4D' }}
                            titleStyle={{ marginLeft: 20 }}
                            icon={
                                <FaIcon
                                    name="google"
                                    size={20}
                                    color="white"
                                />
                            }
                            title="Google"
                        />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <LoginButton
                            // publishPermissions={['publish_actions']}
                            readPermissions={['public_profile']}
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                this.initUser(data.accessToken.toString())
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished={() => console.log("logout.")} />
                        {/* <Button
                            buttonStyle={{ backgroundColor: '#1977F3' }}
                            titleStyle={{ marginLeft: 20 }}
                            icon={
                                <FaIcon
                                    name="facebook"
                                    size={20}
                                    color="white"
                                />
                            }
                            title="Facebook"
                        /> */}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 60 }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 15 }}>Already have an Account ? </Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 15, color: '#339AF0' }} onPress={() => { this.props.navigation.navigate('login') }}>Login</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        bebas: state.users.username
    }
}

export default connect(mapStateToProps, { onRegisterSuccess })(register) 
