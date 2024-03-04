import { useState } from "react";
import { Dimensions, Pressable, StatusBar, View, Image, KeyboardAvoidingView, ScrollView, Text } from "react-native";
import { ImagePickerModal } from "../../components/modal/ImagePickerModal";
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react/cjs/react.development";
import { TextField } from "../../components/field/TextField";
import { LoadingModal } from "../../components/general/Loading";
import { uploadEditProfile } from "../../store/reducers/profile";

export const EditProfileScreen = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('screen');
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const [openPicker, setOpenPicker] = useState(false);
    const [image, setImage] = useState(require("../../assets/logo-horiz.png"));
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState({
        phone: '',
        name: '',
    })

    useEffect(() => {
        if(profile.name){
            setName(profile.name);
        }
        if(profile.profile){
            setImage(profile.profile);
        }
        if(profile.phone){
            setPhone(profile.phone);
        }
    }, [profile.name])

    const handleChooseCamera = async () => {
        setOpenPicker(false);
        // Check Permission Access to Camera
        let res = await ImagePicker.getCameraPermissionsAsync();

        // If camera was not allow ask for permission
        if(res.granted === false){
            const res = await ImagePicker.requestCameraPermissionsAsync();

            if(res.granted){
                let result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 1,
                });
  
                if (!result.canceled) {
                    setImage({
                        value: result.assets[0].uri,
                        type: result.assets[0].type,
                        name: result.assets[0].fileName,
                    })
                }
            }
        } else {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });

            if (!result.canceled) {
                setImage({
                    value: result.assets[0].uri,
                    type: result.assets[0].type,
                    name: result.assets[0].fileName,
                })
            }
        }
    };

    function submitEdit(){
        try {
            dispatch(uploadEditProfile({
                image: image,
                name: name,
                phone: phone,
            }))

            navigation.goBack();
        } catch(error){
            console.log(error);
        }
    }

    const handleChooseGallery = async () => {
        setOpenPicker(false);
        // Check Permission
        let res = await ImagePicker.getMediaLibraryPermissionsAsync();

        // If gallery was not allow ask for permission
        if(res.granted === false){
            const res = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if(res.granted){
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 1,
                  });
              
                if (!result.canceled) {
                    setImage({
                        value: result.assets[0].uri,
                        type: result.assets[0].type,
                        name: result.assets[0].fileName,
                    })
                }
            }
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
              });
          
            if (!result.canceled) {
                setImage({
                  value: result.assets[0].uri,
                  type: result.assets[0].type,
                  name: result.assets[0].fileName,
                })
            }
        }
    };

    return(
        <>
            {/* 
                Note:
                Statusbar hanya berlaku di android device aja kalau di IOS harus mainin View component, Status bar itu bagian yang ada battery indicator atau notif bar
            */}
            <ImagePickerModal  
                show={openPicker}
                onClose={() => setOpenPicker(false)}
                cameraClick={() => handleChooseCamera()}
                galleryClick={() => handleChooseGallery()}
            />
            {
                profile.loading && (<LoadingModal open={profile.loading} />)
            }
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
                        <Pressable onPress={() => setOpenPicker(true)} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 30,
                            marginBottom: 40
                        }}>
                            <Image style={{  width: 147, height: 147, borderRadius: 100, borderColor: '#FFF', borderWidth: 1 }} source={image?.value ? { uri: image?.value } : profile.profile ? { uri: profile.profile } : image} />
                        </Pressable>
                    </View>
                    <ScrollView style={{ paddingHorizontal: 40 }}>
                        <View>
                            <Text style={{ color: '#FFF'}}>Name</Text>
                            <TextField error={error.name} placeholder="Name" value={name} type="default" onChange={(e) => setName(e)} inputStyle={{ color: '#FFF' }} />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={{ color: '#FFF'}}>Phone Number</Text>
                            <TextField error={error.phone} placeholder="Phone" value={phone} type="number-pad" onChange={(e) => setPhone(e)} inputStyle={{ color: '#FFF' }} />
                        </View>
                        <Pressable onPress={() => submitEdit()} style={{ borderRadius: 25, borderWitdh: 1, borderColor: '#FFF', backgroundColor: '#FFF', marginTop: 32 }}>
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