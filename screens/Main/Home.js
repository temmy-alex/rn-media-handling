import { Dimensions, StatusBar, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { initial } from "../../store/reducers/profile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react/cjs/react.development";

export const HomeScreen = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('screen');
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    async function initiate() {
        const token = await AsyncStorage.getItem('accessToken');

        if(token){
            if(!profile.email){
                dispatch(initial());
            }
        }
    }

    useEffect(() => {
        initiate();
    }, [])

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
                gap: 30,
            }}>
                <View style={{ marginTop: 24, paddingHorizontal: 40, }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                        <View>
                            <Text style={{ color: '#FFF', fontSize: 12}}>Hi</Text>
                            <Text style={{ color: '#FFF', fontSize: 16}}>{profile.name}</Text>
                        </View>
                        <View>
                            <Pressable onPress={() => navigation.navigate('Transactions')}>
                                <Text style={{ color: '#FFFE2A', fontSize: 12}}>View Transaction</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}