import { Dimensions, StatusBar, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { getTransaction } from "../../store/reducers/profile";
import { useEffect } from "react/cjs/react.development";
import { thousandSeparator } from "../../utils/ThousandSeparator";

export const TransactionScreen = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('screen');
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransaction());
    }, [profile.transactionFinish])

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
                    <Pressable onPress={() => navigation.navigate('CreateTransaction')} style={{  }}>
                        <Text style={{ color: '#FFFE2A', textAlign: 'right' }}>Add Transaction</Text>
                    </Pressable>
                    {
                        profile?.transactions && profile?.transactions?.length > 0 ? profile?.transactions.map((data) => {
                            return (
                                <View key={data.id} style={{ marginTop: 16, display: 'flex', flexDirection: 'row', padding: 8, justifyContent: 'space-between', alignItems: 'center', gap: 10, backgroundColor: 'white', borderRadius: 10 }}>
                                    <View>
                                        <Text style={{ fontSize: 12}}>{data.title}</Text>
                                        <Text style={{ fontSize: 16, color: data.method === 'deposit' ? 'red' : 'green' }}>Rp. {thousandSeparator(data.amount)}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'right', }}>method</Text>
                                        <Text style={{ textTransform: 'uppercase' }}>{data.method}</Text>
                                    </View>
                                </View>
                            )
                        }) : null
                    }
                </View>
            </View>
        </>
    )
}