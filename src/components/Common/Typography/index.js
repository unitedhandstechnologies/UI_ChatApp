import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {setTestIdentifier} from 'utils';

const Typography = ({
  text,
  style,
  testID,
  numberOfLines,
  truncateFromMiddle,
  onPress,
}) => (
  <Text
    {...setTestIdentifier(testID)}
    style={[Style.textColor, style]}
    onPress={onPress}
    ellipsizeMode={truncateFromMiddle ? 'middle' : 'tail'}
    numberOfLines={numberOfLines ?? 0}>
    {text}
  </Text>
);
export default memo(Typography);

const Style = StyleSheet.create({
  textColor: {
    color: '#070505',
  },
});
