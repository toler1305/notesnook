import React, {createRef, useEffect, useState} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import {Screen, ScreenContainer} from 'react-native-screens';
import {DialogManager} from './src/components/DialogManager';
import {Toast} from './src/components/Toast';
import {useTracked} from './src/provider';
import {NavigationStack} from './src/services/Navigator';
import {
  EditorOpacity,
  EditorPosition,
  EditorScale,
  EditorTranslateY,
} from './src/utils/animations';
import {DDS} from './src/utils/utils';
import Editor from './src/views/Editor';

const editorRef = createRef();

const AnimatedScreenContainer = Animated.createAnimatedComponent(
  ScreenContainer,
);

export const Initialize = () => {
  const [state, dispatch] = useTracked();
  const {colors} = state;
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle(colors.night ? 'light-content' : 'dark-content');
  }, []);

  return (
    <>
      <Animatable.View
        transition="backgroundColor"
        duration={300}
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          backgroundColor: colors.bg,
        }}>
        <View
          style={{
            width: DDS.isTab ? '70%' : '100%',
            height: '100%',
            backgroundColor: colors.bg,
          }}>
          <NavigationStack />
        </View>

        <AnimatedScreenContainer
          ref={editorRef}
          onResponderTerminationRequest={true}
          onStartShouldSetResponderCapture={false}
          onStartShouldSetResponder={false}
          onMoveShouldSetResponder={false}
          onMoveShouldSetResponderCapture={false}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'flex-end',
            position: 'absolute',
            backgroundColor: colors.bg,
            elevation: 10,
            opacity: EditorOpacity,
            transform: [
              {
                translateX: EditorPosition,
              },
              {
                translateY: EditorTranslateY,
              },
              {
                scaleX: EditorScale,
              },
              {
                scaleY: EditorScale,
              },
            ],
          }}>
          <Screen
            active={1}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <Editor noMenu={false} />
          </Screen>
        </AnimatedScreenContainer>
      </Animatable.View>
      <Toast />
      <DialogManager colors={colors} />
    </>
  );
};
