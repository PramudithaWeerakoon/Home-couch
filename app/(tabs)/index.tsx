import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Page1: undefined;
  Q2: undefined;
};

type Page1NavigationProp = StackNavigationProp<RootStackParamList, 'Page1'>;

const Page1: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const navigation = useNavigation<Page1NavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);

  const ageRange: number[] = Array.from({ length: 71 }, (_, i) => 10 + i);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / 40);
    setSelectedItemIndex(index);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: selectedItemIndex * 40 - 55,
        animated: true,
      });
    }
  }, [selectedItemIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's get to know {'\n'} you!</Text>
      <Text style={styles.subtitle}>How old are you?</Text>
  
      <View style={styles.pickerContainer}>
        <View style={styles.dividerLine} />
  
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          snapToInterval={40}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={{ height: 55 }} />
          {ageRange.map((age, index) => (
            <View key={index} style={styles.ageItem}>
              <Text style={styles.ageText}>{age}</Text>
            </View>
          ))}
          <View style={{ height: 55 }} />
        </ScrollView>
  
        <View style={styles.selectedOverlay}>
          <Text style={styles.selectedAgeText}>{ageRange[selectedItemIndex]}</Text>
        </View>
  
        <View style={styles.dividerLine} />
      </View>
  
      <Text style={styles.counter}>1/12</Text>
  
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Q2')}
      >
        <Text style={styles.fabText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page1;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F6FF',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    color: '#000',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  pickerContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    width: '60%',
    height: 2,
    backgroundColor: '#000',
    marginVertical: 5,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  ageItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
  },
  selectedOverlay: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAgeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#98C9F1',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    color: '#000',
    marginTop: 50,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#21007E',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
});
