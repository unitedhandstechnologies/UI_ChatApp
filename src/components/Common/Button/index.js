import React, {memo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors} from 'theme';
import style from './style';
const {selectedPrimaryColor, blueColor} = colors;
export const buttonTypes = {
  primary: 0,
  primaryNegative: 1,
  secondary: 2,
  tertiary: 3,
};
function CButton(props) {
  const {
    titleStyle,
    buttonContainerStyle,
    onPress,
    title,
    disabled,
    iconSize,
    rightIcon,
    testId,
    hideRightIcon,
    type = buttonTypes.primary,
  } = props;
  const rightArrowIconSize = iconSize || 16;
  const [selected, setSelected] = useState(false);
  const [size, setSize] = useState({width: 0, height: 0});

  return (
    
    <TouchableOpacity
      style={[
        style.buttonStyle,
        buttonContainerStyle,
        selected &&
          type === buttonTypes.primary && {
            backgroundColor: selectedPrimaryColor,
          },
      ]}
      onLayout={event => {
        const {height, width} = event.nativeEvent.layout;
        setSize({width, height});
      }}
      activeOpacity={1}
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setSelected(true)}
      onPressOut={() => setSelected(false)}>
      <Text style={[style.buttonTextStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default memo(CButton);
