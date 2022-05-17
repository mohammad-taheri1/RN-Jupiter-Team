import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import SearchBox from './src/components/SearchBox';
import ProductList from './src/components/ProductList';
import SearchProductsByTitleService from './src/services/SearchProductsByTitleService';
import Welcome from "./src/components/Welcome";
import { store } from './src/redux/store';

const App = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  const searchHandler = query => {
    setQuery(query);
     setProducts([{ id: 1, isLoading: true }, { id: 2, isLoading: true }, { id: 3, isLoading: true },{ id: 4, isLoading: true },{ id: 5, isLoading: true }]);
    if (query !== '') {
      getProducts(query);
    }
  };

  const getProducts = queryString => {
    setIsLoading(true);
    console.log('getProducts for :' + queryString);
    const serviceResult = SearchProductsByTitleService(queryString);
    serviceResult.then(data => {
      setIsLoading(false);
      setProducts(data);
      setIsListEnd(true);
    });
  };

  return (
    <View style={{flex: 1}}>
       <Provider store={store}>
       <ProductList/>
      
      <SearchBox onSearch={searchHandler} />
      {query === '' && !isLoading && <Welcome />}
      {query === '' && isLoading && <Text>Loading...</Text>}
      {query !== '' && !isLoading && products.length === 0 && (
        <View>
          <Text style={styles.counter}>Nothing Found. Please search again</Text>
        </View>
      )}
      {query !== '' && (
        <View style={{flex: 1}}>
          {/* <ProductList valueProducts={products} isListEnd={isListEnd} /> */}
         
        </View>
      )}
       </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    color: '#007bff',
    padding: 8,
  },
});

export default App;
