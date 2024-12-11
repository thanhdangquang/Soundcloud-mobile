import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = (props) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
          // Kiểm tra hợp lệ dữ liệu
          if (email.length === 0) {
            alert("Chưa nhập email");
            return;
          }
          if (password.length === 0) {
            alert("Chưa nhập password");
            return;
          }
      
          // Thực hiện fetch để lấy dữ liệu
          let url_check_login = "http://192.168.1.4:3000/users?email=" + email;
          let response = await fetch(url_check_login);
      
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
      
          let res_login = await response.json();
      
          if (res_login.length !== 1) {
            alert("Sai email hoặc lỗi trùng lặp dữ liệu");
            return;
          } else {
            // Số lượng lấy được 1 bản ghi ==> kiểm tra Password
            let objU = res_login[0];
            if (objU.password !== password) {
              alert("Sai Password");
              return;
            } else {
              // Đúng password; lưu thông tin vào storage
              try {
                await AsyncStorage.setItem("loginInfo", JSON.stringify(objU));
                // Chuyển màn hình
                props.navigation.navigate("BottomTabNavigation");
              } catch (error) {
                // Error saving data
                console.log(error);
              }
            }
          }
        } catch (error) {
          console.error("Error during login:", error.message);
          alert("An error occurred during login. Please try again later.");
        }
      };
      
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                {/* Header */}
                <View style={{ marginVertical: 22 }}>
                    <Text style={styles.headerText}>Hi Welcome Back! 👋</Text>
                    <Text style={styles.subHeaderText}>Hello again, you have been missed!</Text>
                </View>

                {/* Email Input */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.label}>Email address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                            value={email}
                            onChangeText={ (txt)=>{setEmail(txt)}}
                        />
                    </View>
                </View>

                {/* Password Input */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={styles.input}
                            value={password}
                            onChangeText={ (txt)=> {setPassword(txt)}}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Remember Me Checkbox */}
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />
                    <Text>Remember Me</Text>
                </View>

                {/* Login Button */}
                <Button
                    title="Login"
                    filled
                    onPress={handleLogin}
                    style={styles.loginButton}
                />

                {/* Or Login with Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Or Login with</Text>
                    <View style={styles.divider} />
                </View>

                {/* Social Login Buttons */}
                <View style={styles.socialLoginContainer}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={styles.socialLoginButton}
                    >
                        <Image
                            source={require("../assets/img/facebook.png")}
                            style={styles.socialLoginIcon}
                            resizeMode='contain'
                        />
                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={styles.socialLoginButton}
                    >
                        <Image
                            source={require("../assets/img/google.png")}
                            style={styles.socialLoginIcon}
                            resizeMode='contain'
                        />
                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                {/* Register Link */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={styles.registerLink}>Register</Text>
                    </Pressable>
                </View>

                {/* Display error */}
                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    );
};

const styles = {
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.black,
    },
    subHeaderText: {
        fontSize: 16,
        color: COLORS.black,
    },
    label: {
        fontSize: 16,
        fontWeight: 400,
        marginVertical: 8,
    },
    inputContainer: {
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 22,
    },
    input: {
        flex: 1,
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    checkbox: {
        marginRight: 8,
    },
    loginButton: {
        marginTop: 18,
        marginBottom: 4,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10,
    },
    dividerText: {
        fontSize: 14,
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialLoginButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,
        borderWidth: 1,
        borderColor: COLORS.grey,
        marginRight: 4,
        borderRadius: 10,
    },
    socialLoginIcon: {
        height: 36,
        width: 36,
        marginRight: 8,
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22,
    },
    registerText: {
        fontSize: 16,
        color: COLORS.black,
    },
    registerLink: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "bold",
        marginLeft: 6,
    },
    errorContainer: {
        marginBottom: 12,
    },
    errorText: {
        color: 'red',
    },
};

export default Login;