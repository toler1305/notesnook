import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NavigationService from '../../services/NavigationService';
import {
  SIZE,
  br,
  ph,
  pv,
  opacity,
  FONT,
  WEIGHT,
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
} from '../../common/common';
import Icon from 'react-native-vector-icons/Feather';
import {Header} from '../../components/header';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {AnimatedSafeAreaView} from '../Home';
import {useAppContext} from '../../provider/useAppContext';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const Settings = ({navigation}) => {
  const {colors, changeAccentColor, changeColorScheme} = useAppContext();
  return (
    <AnimatedSafeAreaView
      transition="backgroundColor"
      duration={300}
      style={{
        backgroundColor: colors.bg,
        height: '100%',
      }}>
      <View>
        <Header
          menu={true}
          colors={colors}
          heading="Settings"
          canGoBack={false}
        />

        <FlatList
          data={[
            {
              name: 'General',
              func: () => {},
            },
            {
              name: 'Account',
              func: () => {
                NavigationService.navigate('AccountSettings');
              },
            },
            {
              name: 'Theme',
              customComponent: (
                <View>
                  <ScrollView
                    contentContainerStyle={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: 10,
                      marginHorizontal: 20,
                    }}>
                    {[
                      '#e6194b',
                      '#3cb44b',
                      '#ffe119',
                      '#0560FF',
                      '#f58231',
                      '#911eb4',
                      '#46f0f0',
                      '#f032e6',
                      '#bcf60c',
                      '#fabebe',
                    ].map(item => (
                      <TouchableOpacity
                        onPress={() => {
                          changeAccentColor(item);

                          AsyncStorage.setItem('accentColor', item);
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 10,
                          marginVertical: 5,
                        }}>
                        <View
                          style={{
                            width: 45,
                            height: 45,
                            backgroundColor: item,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {colors.accent === item ? (
                            <Icon size={SIZE.lg} color="white" name="check" />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      if (!colors.night) {
                        AsyncStorage.setItem(
                          'theme',
                          JSON.stringify(COLOR_SCHEME_DARK),
                        );
                        changeColorScheme(COLOR_SCHEME_DARK);
                      } else {
                        AsyncStorage.setItem(
                          'theme',
                          JSON.stringify(COLOR_SCHEME_LIGHT),
                        );

                        changeColorScheme(COLOR_SCHEME_LIGHT);
                      }
                    }}
                    activeOpacity={opacity}
                    style={{
                      width: '85%',
                      marginHorizontal: '5%',
                      paddingVertical: pv + 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: SIZE.sm + 1,
                        fontFamily: WEIGHT.regular,
                        textAlignVertical: 'center',
                        color: colors.pri,
                      }}>
                      Dark Mode
                    </Text>
                    <Icon
                      size={SIZE.md}
                      color={colors.night ? colors.accent : colors.icon}
                      name={colors.night ? 'toggle-right' : 'toggle-left'}
                    />
                  </TouchableOpacity>
                </View>
              ),
            },
            {
              name: 'Terms of Service',
              func: () => {},
            },
            {
              name: 'Privacy Policy',
              func: () => {},
            },
            {
              name: 'About',
              func: () => {},
            },
          ]}
          keyExtractor={item => item.name}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={opacity}
              onPress={item.func}
              style={{
                borderBottomWidth: 1,
                width: item.step ? '85%' : '90%',
                marginHorizontal: '5%',
                borderBottomColor: colors.nav,
                paddingVertical: pv + 5,

                marginLeft: item.step ? '10%' : '5%',
              }}>
              <Text
                style={{
                  fontSize: item.step ? SIZE.sm : SIZE.md,
                  fontFamily: WEIGHT.regular,
                  textAlignVertical: 'center',
                  color: colors.pri,
                }}>
                {item.name}
              </Text>
              {item.customComponent ? item.customComponent : null}
            </TouchableOpacity>
          )}
        />
      </View>
    </AnimatedSafeAreaView>
  );
};

Settings.navigationOptions = {
  header: null,
};

export default Settings;
