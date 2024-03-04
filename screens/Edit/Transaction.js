import { useState } from "react";
import { Dimensions, Pressable, StatusBar, View, Image, KeyboardAvoidingView, ScrollView, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from "../../components/field/TextField";
import { LoadingModal } from "../../components/general/Loading";
import { Picker } from '@react-native-picker/picker';
import { createTransaction } from "../../store/reducers/profile";
import { useEffect } from "react";

export const CreateTransactionScreen = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('screen');
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("deposit");
    const [error, setError] = useState({
        title: '',
        description: '',
        amount: '',
        method: '',
    })

    function submitEdit(){
        try {
            dispatch(createTransaction({
                title,
                description,
                method,
                totalAmount: amount
            }));
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(profile.transactionFinish) navigation.goBack();
    }, [profile.transactionFinish])

    return(
        <>
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
                paddingTop: 32
            }}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView style={{ paddingHorizontal: 40 }}>
                        <View>
                            <Text style={{ color: '#FFF', marginBottom: 4}}>Title</Text>
                            <TextField error={error.title} placeholder="Title" value={title} type="default" onChange={(e) => setTitle(e)} inputStyle={{ color: '#FFF' }} />
                        </View>
                        <View style={{ marginVertical: 16}}>
                            <Text style={{ color: '#FFF', marginBottom: 4}}>Description</Text>
                            <TextField error={error.description} multiline numberOfLines={4} placeholder="Description" value={description} type="default" onChange={(e) => setDescription(e)} inputStyle={{ color: '#FFF' }} />
                        </View>
                        <View>
                            <Text style={{ color: '#FFF', marginBottom: 4}}>Total Amount</Text>
                            <TextField error={error.amount} placeholder="100000" value={amount} type="number-pad" onChange={(e) => setAmount(e)} inputStyle={{ color: '#FFF' }} />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={{ color: '#FFF', marginBottom: 4 }}>Method</Text>
                            <View style={{ borderColor: '#FFF', borderRadius: 8, borderWidth: 1 }}>
                                <Picker 
                                    style={{ borderColor: '#FFF', borderWidth: 1, color: '#FFF', borderRadius: 16, }}
                                    selectedValue={method}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setMethod(itemValue)
                                    }
                                >
                                    <Picker.Item label="Deposit" value="deposit" />
                                    <Picker.Item label="Withdrawal" value="withdrawal" />
                                </Picker>
                            </View>
                        </View>
                        <Pressable onPress={() => submitEdit()} style={{ borderRadius: 25, borderWitdh: 1, borderColor: '#FFF', backgroundColor: '#FFF', marginTop: 32 }}>
                            <Text style={{ color: '#000', fontWeight: 600, textAlign: 'center', padding: 12 }}>
                                Create
                            </Text>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}