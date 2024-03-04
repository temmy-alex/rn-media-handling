import { useEffect, useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Pressable, StatusBar, Text, View } from "react-native";
import { TextField } from "../components/field/TextField";
import { LoadingModal } from "../components/general/Loading";
import { loginValidationSchema } from "../configs/lib/authentication/validation";
import { login } from "../configs/lib/authentication/rest";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { initial } from "../store/reducers/profile";

export const LoginScreen = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('screen');
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        email: false,
        messagePhone: '',
        password: false,
        messagePass: '',
    })

    async function handleSubmit(){
        try {
            setError({
                email: false,
                messagePhone: '',
                password: false,
                messagePass: ''
            });

            setLoading(true);

            // Check Value through Validation Yup
            await loginValidationSchema.validate(
                {
                  emailPhone: email,
                  password: password,
                },
                // AbortEarly True => nanti saat nemu error langsung lempar ke error, kalau false, dia akan tunggu sampai semua field ke check
                { abortEarly: false }
            );

            const res = await login({
                email: email,
                password
            });

            await AsyncStorage.setItem('accessToken', res.data.accessToken);

            setLoading(false);
            navigation.replace('HomeGroup');
        } catch(error) {
            if (error.name === 'ValidationError') {
                let section = {
                  email: false,
                  messagePhone: '',
                  password: false,
                  messagePass: ''
                };
        
                // Check Each Field for error
                error.errors.forEach((data) => {
                  if (data.toLowerCase().includes('phone')) section = { ...section, email: true, messagePhone: data };
                  if (data.toLowerCase().includes('email')) section = { ...section, email: true, messagePhone: data };
                  if (data.toLowerCase().includes('password')) section = { ...section, password: true, messagePass: data };
                });

                setError({
                    ...section,
                })
            }
        } finally {
            setLoading(false);
        }
    }

    async function initiate() {
        const token = await AsyncStorage.getItem('accessToken');

        if(token){
            if(!profile.email){
                dispatch(initial());
            }

            if(profile.email){
                navigation.replace('HomeGroup');
            }
        }
    }

    useEffect(() => {
        initiate();
    }, [profile.email]);

    if(profile.loading) return(<LoadingModal loading={profile.loading} />)

    return(
        <>
            {/* 
                Note:
                Statusbar hanya berlaku di android device aja kalau di IOS harus mainin View component, Status bar itu bagian yang ada battery indicator atau notif bar
            */}
            <StatusBar backgroundColor="#000"></StatusBar>
            <LoadingModal loading={loading} />
            <View style={{
                width: width,
                height: height,
                backgroundColor: "#000",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30,
            }}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: height * 0.6,
                        paddingTop: 20,
                        paddingHorizontal: 40,
                    }}>
                        <Image style={{ width: 200, height: 147 }} source={require("../assets/logo-horiz.png")} />
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 32, fontWeight: 600, }}>Hi Newers</Text>
                        <View>
                            <TextField error={error.email} placeholder="Email" value={email} type="default" onChange={(e) => setEmail(e)} inputStyle={{ color: '#FFF' }} />
                            <Text style={{ color: '#FF0D23', marginVertical: 4}}>{error?.messagePhone}</Text>
                        </View>
                        <View>
                            <TextField error={error.password} placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e)} inputStyle={{ color: '#FFF' }} />
                            <Text style={{ color: '#FF0D23', marginVertical: 4 }}>{error?.messagePass}</Text>
                        </View>
                        <Pressable onPress={() => handleSubmit()} style={{ backgroundColor: '#fff', width: width * 0.5, padding: 8, borderRadius: 16 }}>
                            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 600 }}>Login</Text>
                        </Pressable>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                marginTop: 5,
                            }}
                            >
                            <View
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 10,
                                }}
                            >
                                <Text style={{ color: '#fff' }}>
                                    Belum Punya Akun?
                                </Text>
                                <Pressable onPress={() => navigation.navigate('Register')}>
                                    <Text style={{ color: '#FFF', fontWeight: 600 }}>
                                        Buat Sekarang
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}