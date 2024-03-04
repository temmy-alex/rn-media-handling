import { Pressable, View, Text, Dimensions } from "react-native";
import { BaseModal } from "../general/BaseModal";
import styled from "styled-components/native";
import { ImageIcon } from "../general/SvgIcon";
const { width, height } = Dimensions.get('screen')

const OptionContainer = styled.Pressable`
    margin-vertical: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border-color: #948EA5;
    border-width: 1px;
    width: 50%;
    padding-vertical: 25px
`
export const ImagePickerModal = ({
    show,
    cameraClick,
    galleryClick,
    onClose,
}) => {

    return (
        <>
            <BaseModal 
                centered 
                show={show} 
                onClose={onClose}
            >
                <Text style={{ textAlign: 'center', fontWeight: 600, marginBottom: 16, fontSize: 16, }}>Choose Image Pick</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10
                }}>
                    <OptionContainer>
                        <Pressable onPress={cameraClick} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 5
                        }}>
                            <ImageIcon fill={"#3F3356"} />
                            <Text style={{ textAlign: 'center' }}>Camera</Text>
                        </Pressable>
                    </OptionContainer>
                    <OptionContainer>
                        <Pressable onPress={galleryClick} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 5
                        }}>
                            <ImageIcon fill={"#3F3356"} />
                            <Text style={{ textAlign: 'center' }}>Gallery</Text>
                        </Pressable>
                    </OptionContainer>
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                    <Pressable onPress={() => onClose()} style={{ backgroundColor: '#000', width: width * 0.5, padding: 8, borderRadius: 16 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: '#fff' }}>Tutup</Text>
                    </Pressable>
                </View>
            </BaseModal>
        </>
    )
}