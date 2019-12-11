import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux'
import Axios from 'axios'
class postImage extends Component {
    state = {
        image: null,
        caption: ''
    }

    camera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            // console.log(image);
            this.setState({ image: image })
        });
    }


    onBtnPostPress = () => {
        var fd = new FormData()
        var data = {
            caption: this.state.caption,
            username: this.props.user_data.username,
            id_user: this.props.user_data.id
        }
        data = JSON.stringify(data)
        fd.append('data', data)
        Axios.post(urlApi + 'post/addpost', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        console.log(this.state.image)
        return (
            <View>
                <Text onPress={this.camera}> POST IMAGE </Text>
                <Image
                    width={300}
                    height={300}
                    source={{ uri: this.state.image === null ? null : this.state.image.path }}
                />
                <Input
                    onChangeText={(text) => this.setState({ caption: text })}
                    placeholder='Caption'
                />
                <Button
                    onPress={this.onBtnPostPress}
                    title='Post'
                />
            </View>
        )
    }
}


export default postImage