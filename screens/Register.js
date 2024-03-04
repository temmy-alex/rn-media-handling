import { useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Pressable, StatusBar, Text, View } from "react-native";
import { TextField } from "../components/field/TextField";
import { LoadingModal } from "../components/general/Loading";
import { RegisterValidationSchema } from "../configs/lib/authentication/validation";
import { register } from "../configs/lib/authentication/rest";

export const RegisterScreen = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('screen');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        email: false,
        messageEmail: '',
        phone: false,
        messagePhone: '',
        name: false,
        messageName: '',
        password: false,
        messagePass: '',
    })

    async function handleSubmit(){
        try {
            setError({
                email: false,
                messageEmail: '',
                phone: false,
                messagePhone: '',
                name: false,
                messageName: '',
                password: false,
                messagePass: ''
            });

            setLoading(true);

            // Check Value through Validation Yup
            await RegisterValidationSchema.validate(
                {
                  email: email,
                  phone: phone,
                  name: name,
                  password: password,
                },
                // AbortEarly True => nanti saat nemu error langsung lempar ke error, kalau false, dia akan tunggu sampai semua field ke check
                { abortEarly: false }
            );

            const res = await register({
                email: email,
                password,
                name,
                phone,
            });

            setLoading(false);
            navigation.replace('Login');
        } catch(error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                let section = {
                  email: false,
                  messageEmail: '',
                  phone: false,
                  messagePhone: '',
                  name: false,
                  messageName: '',
                  password: false,
                  messagePass: ''
                };
        
                // Check Each Field for error
                error.errors.forEach((data) => {
                  if (data.toLowerCase().includes('phone')) section = { ...section, phone: true, messagePhone: data };
                  if (data.toLowerCase().includes('name')) section = { ...section, name: true, messageName: data };
                  if (data.toLowerCase().includes('email')) section = { ...section, email: true, messageEmail: data };
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

    return(
        <>
            {/* 
                Note:
                Statusbar hanya berlaku di android device aja kalau di IOS harus mainin View component
            */}
            <StatusBar backgroundColor="#FFFFFF"></StatusBar>
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
                        height: height * 0.7,
                        paddingTop: 20,
                        paddingHorizontal: 40,
                    }}>
                        <Image style={{ width: 200, height: 147 }} source={require("../assets/logo-horiz.png")} />
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 24, fontWeight: 600, marginBottom: 16, }}>Join with Newers Community</Text>
                        <View>
                            <TextField error={error.name} placeholder="Name" value={name} type="default" onChange={(e) => setName(e)} inputStyle={{ color: '#FFF' }} />
                            <Text style={{ color: '#FF0D23', marginVertical: 4}}>{error?.messageName}</Text>
                        </View>
                        <View>
                            <TextField error={error.email} placeholder="Email" value={email} type="default" onChange={(e) => setEmail(e)} inputStyle={{ color: '#FFF' }} />
                            <Text style={{ color: '#FF0D23', marginVertical: 4}}>{error?.messageEmail}</Text>
                        </View>
                        <View>
                            <TextField error={error.phone} placeholder="Phone" value={phone} type="default" onChange={(e) => setPhone(e)} inputStyle={{ color: '#FFF' }} />
                            <Text style={{ color: '#FF0D23', marginVertical: 4}}>{error?.messagePhone}</Text>
                        </View>
                        <View>
                            <TextField error={error.password} placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e)} inputStyle={{ color: '#FFF' }} />
                            <Text style={{ color: '#FF0D23', marginVertical: 4 }}>{error?.messagePass}</Text>
                        </View>
                        <Pressable onPress={() => handleSubmit()} style={{ backgroundColor: '#fff', width: width * 0.5, padding: 8, borderRadius: 16 }}>
                            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 600 }}>Register</Text>
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
                                    gap: 8,
                                }}
                            >
                                <Text style={{ color: '#fff' }}>
                                    Sudah Punya Akun?
                                </Text>
                                <Pressable onPress={() => navigation.replace('Login')}>
                                    <Text style={{ color: '#FFF', fontWeight: 600 }}>
                                        Masuk
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