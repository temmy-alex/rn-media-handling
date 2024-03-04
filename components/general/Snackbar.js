import React, { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
const { height, width } = Dimensions.get('screen');

const SectionContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
  right: 0;
  zIndex: 20;
`

const Snackbar = ({
  message,
  actionText,
  onActionPress,
  duration = 3000, // Default duration in milliseconds
  position = "bottom", // Default position
  containerStyle,
  messageStyle,
  actionTextStyle,
  backgroundColor,
  textColor,
  actionTextColor,
  visible,
  onTimeout,
}) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onTimeout();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [visible, duration]);

  return visible ? (
    <SectionContainer
      style={[
        position === "top" ? { top: insets.top + 15 } : { bottom: height * 0.2 },
        containerStyle,
        { backgroundColor: backgroundColor, },
      ]}
    >
      <Text style={[styles.messageText, messageStyle, { color: textColor, textTransform: 'capitalize', width: '85%' }]}>
        {message}
      </Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress} style={{ ...actionTextStyle }}>
          <Text
            style={[
              styles.actionText,
              { color: actionTextColor },
            ]}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </SectionContainer>
  ) : null;
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    maxWidth: width < 370 ? width * 0.5 : width * 0.6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 600,
  },
});

export default Snackbar;