import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import { Database, Auth } from '../config';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }
    add = () => {
        if (this.state.fullName == '' && this.state.email == '' && this.state.password == '') {
            alert('Harap mengisi Semua Form!')
        }
        else {
            Auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    console.log(response)
                    Database.ref('/user/' + response.user.uid).set({
                        name: this.state.name,
                        status: 'Ada',
                        email: this.state.email,
                        photo: 'https://i.imgur.com/zpjUVPT.png'
                    })
                        .catch(error => {
                            alert(error.message)
                            this.setState({
                                name: '',
                                email: '',
                                password: '',
                            });
                        })
                    let data = {
                        name: this.state.name,
                        status: 'Ada',
                        email: this.state.email,
                        photo: 'https://i.imgur.com/zpjUVPT.png'
                    }
                    Alert.alert(
                        'Register',
                        'Register Success', [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Login') }
                        ]
                    )
                })
                .catch(error => {
                    alert(error.message)
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                    });
                })
        }
    };
    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'http://icons.iconarchive.com/icons/mysitemyway/blue-jeans-social-media/256/mail-icon.png' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={val => this.setState({ 'email': val })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.pngtree.com/svg/20170602/user_circle_1048392.png' }} />
                    <TextInput style={styles.inputs}
                        placeholder="name"
                        keyboardType="default"
                        underlineColorAndroid='transparent'
                        onChangeText={val => this.setState({ 'name': val })} />
                </View>



                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://image.flaticon.com/icons/png/512/69/69891.png' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={val => this.setState({ 'password': val })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.add}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        marginBottom: 30
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});