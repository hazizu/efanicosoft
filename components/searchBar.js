
import React, { useState } from 'react';
import { SearchBar } from 'react-native-screens';
import { View,Text } from 'react-native';


const SearchBare= () => {

const [search, setSearch] = useState('');

const updateSearch = (text) => {
    setSearch(text);
};
    return (
        <View>
            <Text>hi</Text>
        <SearchBar
            placeholder="Rechercher"
            onChangeText={updateSearch}
            value={search}
            containerStyle={{ backgroundColor: 'green', borderTopColor: 'green', borderBottomColor: 'black' }}
            inputContainerStyle={{ backgroundColor: '#f5f5f5' }}
            inputStyle={{ fontSize: 14 }}
            searchIcon={{ size: 24 }}
            clearIcon={{ size: 24 }}
            round
        />
        </View>
    );
};

export default SearchBare;

