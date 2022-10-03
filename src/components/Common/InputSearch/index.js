import React, {forwardRef} from 'react';
import {View, TextInput, Text} from 'react-native';
import {colors} from 'theme';
import Style from './style';

const {white} = colors;

function CTextBox(props, ref) {
  const {
    hidePassword,
    containerStyle,
    style,
    maxLength,
    keyboardType,
    onChangeText,
    value,
    leftText,
    editable,
    placeHolderText,
    onFocus,
    onBlur,
    phoneFocused,
    placeholderTextColor = white,
    autoFocus = true,
  } = props;
  return (
    <View
      style={[
        Style.container,
        containerStyle,
        phoneFocused && Style.focusedTextInput,
      ]}>
      {leftText && <Text style={Style.leftText}>{leftText}</Text>}

      <TextInput
        ref={ref}
        style={[Style.input, style]}
        underlineColorAndroid="transparent"
        placeholder={placeHolderText}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={hidePassword}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        editable={editable}
        selectionColor={white}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
    </View>
  );
}

export default forwardRef(CTextBox);
