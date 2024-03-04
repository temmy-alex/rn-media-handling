import React from "react";
import { Pressable, TextInput } from "react-native"
import styled from "styled-components/native";
import { SecureIcon, UnsecureIcon, SuccessIcon, WrongIcon } from "../general/SvgIcon";

const TextFieldContainer = styled.View`
    padding: 8px 12px;
    border: 1px solid #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
`

export const TextField = ({
    value = '',
    multiline = false,
    numberOfLines = 1,
    onChange,
    placeholder = '',
    disabled = false,
    type = 'default',
    maxCharacters,
    error,
    success,
    borderColor = '#D0C9D6',
    inputProps,
    containerStyle = {},
    inputStyle = {},
    forwardRef = null,
    showErrorIcon = true,
    hideCursor = false,
    onKeyPress = (e) => null
}) => {
    const [focus, setFocus] = React.useState(false);
    const [secure, setSecure] = React.useState(true);

    if(type === 'password') {
        return (
            <TextFieldContainer style={{
                backgroundColor: disabled ? '#E4E3E8' : '',
                borderColor: error ? '#FF0D23' : success ? '#45A834' : disabled ? '#E4E3E8' : borderColor,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...containerStyle,
            }}>
                <TextInput
                    onFocus={() => setFocus(!focus)}
                    style={{
                        width: '92%',
                        fontSize: 16,
                        color: error ? '#FF0D23' : success ? '#45A834' : '#3F3356',
                        ...inputStyle,
                    }}
                    ref={forwardRef}
                    keyboardType='default'
                    secureTextEntry={secure}
                    placeholderTextColor={error ? '#FF0D23' : success ? '#45A834' : "#D0C9D6" }
                    editable={disabled ? false : true}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange}
                />
                <Pressable onPress={() => setSecure(!secure)}>
                    {
                        secure ? <SecureIcon fill={error ? '#FF0D23' : '#D0C9D6'} /> : <UnsecureIcon fill={error ? '#FF0D23' : '#D0C9D6'} />
                    }
                </Pressable>
            </TextFieldContainer>
        )
    }

    return (
        <TextFieldContainer style={{
            backgroundColor: disabled ? '#E4E3E8' : '',
            borderColor: error ? '#FF0D23' : success ? '#45A834' : disabled ? '#E4E3E8' : borderColor,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...containerStyle,
        }}>
            <TextInput
                {...inputProps}
                onFocus={() => setFocus(!focus)}
                style={{
                    width: error ? '92%' : success ? '92%' : '100%',
                    fontSize: 16,
                    color: error ? '#FF0D23' : success ? '#45A834' : '#FFFFFF',
                    ...inputStyle,
                }}
                multiline={multiline}
                numberOfLines={numberOfLines}
                caretHidden={hideCursor}
                ref={forwardRef}
                keyboardType={type}
                maxLength={maxCharacters}
                placeholderTextColor={error ? '#FF0D23' : success ? '#45A834' : "#D0C9D6" }
                editable={disabled ? false : true}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onKeyPress={onKeyPress}
            />
            {
                error ? showErrorIcon ? <WrongIcon /> : success ? <SuccessIcon /> : null : null
            }
        </TextFieldContainer>
    )
}