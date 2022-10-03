import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {colors, scaleSize} from 'theme';

const AppInformation = ({navigation}) => {
  const {params} = useRoute();
  navigation.setOptions({
    title: params?.title,
  });
  const {width} = useWindowDimensions();
  return (
    <ScrollView style={{flex: 1, paddingHorizontal: scaleSize(16)}}>
      <RenderHTML
        tagsStyles={{
          body: {color: colors.black},
        }}
        contentWidth={width}
        source={{html: params?.html}}
      />
    </ScrollView>
  );
};

export default AppInformation;
