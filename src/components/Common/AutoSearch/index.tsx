import React, { FunctionComponent, useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native'
import {colors, scaleSize, scaleFont} from 'theme';
const {
  white,
  lightText,
  black,
  lightPrimaryColor,
  textBackgroundColor,
  redColor1,
} = colors;

export type PredictionType = {
  description: string
  place_id: string
  reference: string
  structured_formatting: string
  matched_substrings: any[]
  tructured_formatting: Object
  terms: Object[]
  types: string[]
}

type SearchBarProps = {
  value: string,
  placeholder: string,
  placeholderTextColor:  string,
  style?: ViewStyle | ViewStyle[]
  onChangeText: (text: string) => void
  predictions: PredictionType[]
  showPredictions: boolean
  onPredictionTapped: (placeId: string, description: string, structured_formatting: string) => void
}

const SearchBarWithAutocomplete: FunctionComponent<SearchBarProps> = props => {
  const [inputSize, setInputSize] = useState({ width: 0, height: 0 })

  const {
    value,
    style,
    onChangeText,
    onPredictionTapped,
    predictions,
    showPredictions,
    placeholder,
    placeholderTextColor,
  } = props

  const {
    container,
    inputStyle
  } = styles
  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style
  const inputBottomRadius = showPredictions ?
    {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
    :
    {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
    }

  const _renderPredictions = (predictions: PredictionType[]) => {
    const {
      predictionsContainer,
      predictionRow
    } = styles
    const calculatedStyle = { 
      width: inputSize.width
    }
    
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flexGrow: 1}} 
        horizontal
        nestedScrollEnabled={true}>
        <FlatList
          data={predictions}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={predictionRow}
                onPress={() =>{
                  console.log('item--',item)
                   onPredictionTapped(item.place_id, item.description, item.structured_formatting)
                }}
              >
                <Text
                  numberOfLines={1}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.place_id}
          keyboardShouldPersistTaps='handled'
          style={[predictionsContainer, calculatedStyle]}
        />
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <View style={[container, { ...passedStyles }]}>
      <TextInput
        style={[inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        returnKeyType='search'
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout
          setInputSize({ height, width })
        }}
      />
      {showPredictions && _renderPredictions(predictions)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  inputStyle: {
    backgroundColor: textBackgroundColor,
    flex: 1,
    height: scaleSize(45),
    padding: scaleSize(10),
    borderRadius: scaleSize(40),
    color: black,
  },
  predictionsContainer: {
    backgroundColor: '#cfcfcf',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  predictionRow: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
})

export default SearchBarWithAutocomplete