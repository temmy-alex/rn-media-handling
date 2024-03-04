import { Dimensions, Modal } from "react-native"
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');

const SectionContainer = styled.View`
    display: flex; 
    align-items: center;
    flex-direction: column;
    minHeight: ${height}px;
    backgroundColor: rgba(0, 0, 0, 0.6);
`

const ModalContainer = styled.View`
    width: ${(0.93 * width)}px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`


export const BaseModal = ({
    children,
    show,
    centered = true,
    onClose,
    styleModal,
    styleInnerModal,
    borderRadiusInnerModal = 30,
    animation = 'slide'
}) => {
    const insets = useSafeAreaInsets();

    return(
        <Modal
            animationType={animation}
            transparent={true}
            visible={show}
            onRequestClose={onClose}
            collapsable={true}
        >
            <SectionContainer
                style={[
                    {
                        justifyContent: centered ? 'center' : '' 
                    }, 
                    {...styleModal}
                ]}>
                <ModalContainer style={{borderRadius: borderRadiusInnerModal, paddingHorizontal:25, paddingVertical:25, ...styleInnerModal }}>
                    {children}
                </ModalContainer>
            </SectionContainer>
        </Modal>
    )

}