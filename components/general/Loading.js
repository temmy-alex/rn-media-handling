import {useRef, useEffect} from "react"
import { View, StyleSheet, Animated, Text, Image, Dimensions } from "react-native";
import { BaseModal } from "./BaseModal";
const { width } = Dimensions.get('screen')

export const LoadingModal = ({loading}) => {
    return (
        <BaseModal 
            show={loading} 
            styleInnerModal={{ paddingLeft: 2, paddingRight:2, paddingTop: 2, paddingBottom: 2, borderColor: '#FFF', borderWidth: 1, }}
        >
            <View style={styles.elements}>
                <Image style={{ width: 200, height: 147 }} source={require("../../assets/logo-horiz.png")} />
                <View style={styles.loadingTextNDots}>
                    <Text style={styles.loadText}>
                        Loading
                    </Text>
                    <BlinkingDots />
                </View>
            </View>      
        </BaseModal>
    )
}


const BlinkingDots = () => {
    const translY1 = useRef(new Animated.Value(0)).current;
    const translY2 = useRef(new Animated.Value(0)).current;
    const translY3 = useRef(new Animated.Value(0)).current;

    const duration = 200

    useEffect(()=>{
        show()
    }, [])

    const show = () => {
        Animated.sequence([
            Animated.timing(translY1, {
                toValue: -5,
                duration,            
                useNativeDriver: true,
            }),
            Animated.timing(translY2, {
                toValue: -5,
                duration,            
                useNativeDriver: true,
            }),
            Animated.timing(translY3, {
                toValue: -5,
                duration,            
                useNativeDriver: true,
            })
        ]).start(hide)
    }

    const hide = () => {
        Animated.sequence([
            Animated.timing(translY1, {
                toValue: 0,
                duration,            
                useNativeDriver: true,
            }),
            Animated.timing(translY2, {
                toValue: 0,
                duration,            
                useNativeDriver: true,
            }),
            Animated.timing(translY3, {
                toValue: 0,
                duration,            
                useNativeDriver: true,
            })
        ]).start(show)        
    }

    return (
        <View style={styles.dots}>
            {
                [1, 2, 3].map(d => {
                    const myTranslY = d === 1?translY1:d===2?translY2:translY3
                    return (
                        <Animated.View // Special animatable View
                            key={d}
                            style={                                
                                {  
                                    ...styles.dot,                              
                                    // opacity: myOpac, // Bind opacity to animated value
                                    transform: [ {translateY: myTranslY}]
                                }}
                        />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    elements:{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingVertical: 16,
    },
    icon:{
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
    },
    loadingTextNDots: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        height: 32, 
        paddingLeft: 13
    },
    loadText: {
        fontSize: 28,
        lineHeight: 28,
        fontWeight: '600',
        color: "#FFF",
    },
    dots: {
        width: 80, 
        height: 40, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 8,
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "flex-end"
    },
    dot: {
        width: 13, 
        height: 13, 
        borderRadius: 8, 
        backgroundColor: "#FFF",
    }
})