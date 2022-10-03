import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Typography} from 'components';
import Style from './style';

function InitialNameAvatar({
  text,
  containerStyle,
  avatarViewStyle,
  avatarLabelStyle,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[Style.container, containerStyle]}
      onPress={onPress}>
      <View style={[Style.avatarLabelView, avatarViewStyle]}>
        <Typography
          style={[Style.avatarLabel, avatarLabelStyle]}
          text={text?.substring(0, 1) ?? ''}
        />
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(InitialNameAvatar);
