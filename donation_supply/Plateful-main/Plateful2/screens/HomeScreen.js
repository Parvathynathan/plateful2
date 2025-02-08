import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import LendingScreen from '../screens/LendScreen';
import WantedScreen from '../screens/WantedScreen';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabWidth, setTabWidth] = useState(Dimensions.get('window').width / 2);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const pagerViewRef = useRef();

  useEffect(() => {
    const onResize = () => {
      setTabWidth(Dimensions.get('window').width / 2);
    };

    const subscription = Dimensions.addEventListener('change', onResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handleTabChange = (index) => {
    setSelectedTab(index);
    Animated.spring(tabOffsetValue, {
      toValue: tabWidth * index,
      useNativeDriver: true,
    }).start();
    pagerViewRef.current.setPage(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
  <TouchableOpacity onPress={() => handleTabChange(0)} style={styles.tab}>
    <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Lending</Text>
  </TouchableOpacity>
  <View style={styles.tabDivider} />
  <TouchableOpacity onPress={() => handleTabChange(1)} style={styles.tab}>
    <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>Wanted</Text>
  </TouchableOpacity>
</View>

      <Animated.View
        style={[styles.tabIndicator, { width: tabWidth, transform: [{ translateX: tabOffsetValue }] }]}
      />

      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => handleTabChange(e.nativeEvent.position)}
      >
        <View key="1">
          <LendingScreen />
        </View>
        <View key="2">
          <WantedScreen />
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    top: -40
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5,
  },
  tab: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedTabText: {
    color: '#FF0000',
  },
  tabIndicator: {
    height: 2,
    backgroundColor: '#FF0000',
    position: 'absolute',
    top: 40,
    left: 0,
    borderRadius: 2,
  },
  pagerView: {
    flex: 1,
  },
  tabDivider: {
    width: 1,
    backgroundColor: '#FF0000',
    height: '100%',
  },
});
