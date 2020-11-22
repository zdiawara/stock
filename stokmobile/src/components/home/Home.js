import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Header} from '../common';
import Menu from './menu';

const Home = () => {
  return (
    <>
      <Header title="Accueil" />
      <ScrollView contentContainerStyle={styles.container}>
        <Menu />
      </ScrollView>
    </>
  );
};

Home.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
  },
});

export default Home;
