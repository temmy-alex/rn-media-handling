import { useState } from "react";
import { Dimensions, Pressable, StatusBar, View, Image, KeyboardAvoidingView, ScrollView, Text } from "react-native";
import { ImagePickerModal } from "../../components/modal/ImagePickerModal";
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';

export const ProfileScreen = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('screen');
    const profile = useSelector(state => state.profile);

    return(
        <>
            {/* 
                Note:
                Statusbar hanya berlaku di android device aja kalau di IOS harus mainin View component, Status bar itu bagian yang ada battery indicator atau notif bar
            */}
            <StatusBar backgroundColor="#000"></StatusBar>
            <View style={{
                width: width,
                height: height,
                backgroundColor: "#000",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 20,
            }}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: height * 0.3,
                        paddingTop: 20,
                        paddingHorizontal: 40,
                        width: width
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 30,
                            marginBottom: 40
                        }}>
                            <Image style={{  width: 147, height: 147, borderRadius: 100, borderColor: '#FFF', borderWidth: 1 }} source={profile.profile ? {uri: profile.profile} : require("../../assets/logo-horiz.png")} />
                        </View>
                    </View>
                    <ScrollView style={{ paddingHorizontal: 40 }}>
                        <View>
                            <Text style={{ color: '#FFF'}}>Name</Text>
                            <Text style={{ color: '#FFF', fontSize: 24}}>{profile.name}</Text>
                        </View>
                        <View style={{ marginVertical: 16 }}>
                            <Text style={{ color: '#FFF'}}>Email</Text>
                            <Text style={{ color: '#FFF', fontSize: 24}}>{profile.email}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#FFF'}}>Phone Number</Text>
                            <Text style={{ color: '#FFF', fontSize: 24}}>{profile.phone}</Text>
                        </View>
                        <Pressable onPress={() => navigation.navigate('EditProfile')} style={{ borderRadius: 25, borderWitdh: 1, borderColor: '#FFF', backgroundColor: '#FFF', marginTop: 32 }}>
                            <Text style={{ color: '#000', fontWeight: 600, textAlign: 'center', padding: 12 }}>
                                Edit
                            </Text>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}