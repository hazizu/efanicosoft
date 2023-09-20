import React,{useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const SearchBar = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (text) => {
    setValue(text);
    onChange(text);
  };

  return (
    <SafeAreaView style={styles.area}>
      <TextInput
        style={styles.input}
        onChangeText={handleChange}
        value={value}
        placeholder="recherche..."
        keyboardType="default"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height:35,
    borderWidth: 0,
    padding: 10,
    backgroundColor:'#e8e8ed',
    borderRadius:10,
    display:'flex',
  },
  area:{
    width:"70%"
  }
});

export default SearchBar;