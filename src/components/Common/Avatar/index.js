import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const options = {
  width: 300,
  height: 400,
  cropping: true,
  mediaType: 'photo',
  title: 'Select Image',
  useFrontCamera: true,
};

const Avatar = props => {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);
  const pickPicture = () => {
    ImagePicker.openPicker(options)
      .then(image => {
        setUri(image.path);
        props.onChange?.({
          uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
          type: image?.mime === 'image/jpg' ? 'image/jpeg' : image?.mime,
          name: image?.filename ?? 'name.jpeg',
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <TouchableOpacity onPress={pickPicture}>
      <Image
        style={styles.avatar}
        {...props}
        source={uri ? {uri} : props.source}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 100,
    padding: 20,
  },
});

export default React.memo(Avatar);
