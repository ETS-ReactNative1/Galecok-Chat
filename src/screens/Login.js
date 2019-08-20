import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert,
} from 'react-native';
import Logo from '../assets/logo.png'
import { ScrollView } from 'react-native-gesture-handler';
import { Database, Auth } from '../config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            email: '',
            password: ''
        };
    }

    log = async () => {
        if (this.state.email == '' && this.state.password == '') {
            alert('Harap mengisi Semua Form!')
        } else {
            Database.ref('/user').once('value', (result) => {
                let data = result.val();
                if (data !== null) {
                    let user = Object.values(data);
                    console.log(user)

                    user.map((data) => {
                        if (data.email == this.state.email) {
                            AsyncStorage.setItem('user', data.email);
                        }
                    })
                }
            });

            await Auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    Database.ref('/user/' + response.user.uid).update({ status: "Online" })
                    AsyncStorage.setItem('userid', response.user.uid)
                    Alert.alert(
                        'Login',
                        'Login Success', [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Home') }
                        ]
                    )
                })
                .catch(error => {
                    alert(error.message)
                    this.setState({
                        email: '',
                        password: '',
                        refreshing: false
                    });
                })
        }
    };

    render() {
        return (
            <ScrollView>
                <View behavior="padding"
                    style={styles.Wrapper}>
                    <View style={styles.container}>
                        <Image style={styles.logo} source={Logo} />
                        <View>
                            <Text style={styles.title}>Login</Text>
                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'http://icons.iconarchive.com/icons/mysitemyway/blue-jeans-social-media/256/mail-icon.png' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(email) => this.setState({ email })} />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://image.flaticon.com/icons/png/512/69/69891.png' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(password) => this.setState({ password })} />
                            </View>
                            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.log}>
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text>Register</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );

    }
}

export default withNavigation(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    logo: {
        marginBottom: 20,
        height: 372,
        width: 400
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 3,
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
        marginBottom: 30,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: -70,
        backgroundColor: 'white'
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 5
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 50
    }
});