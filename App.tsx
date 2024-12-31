import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { createStaticNavigation, StaticParamList, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { DatabaseScreen } from './screen/database';
import { ChatScreen } from './screen/chat';
import { PromptScreen } from './screen/prompt';
import { ConfigScreen } from './screen/config';
import { ExploreScreen } from './screen/explore';
import { AppContextProvider } from './state/state';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatButtonWithIcon } from './components/button';
import { menuButtonStyle } from './components/button/style';
import { DownloadedScreen } from './screen/downloaded';
import { PaperProvider } from 'react-native-paper';

function prompt() {
  return (
    <PromptScreen />
  );
}

function downloaded() {
  return (
    <DownloadedScreen />
);
}

function explore() {
  return (
    <ExploreScreen />
);
}

const model = createMaterialTopTabNavigator({
  screens: {
    Downloaded: downloaded,
    Explore: explore,
  },
  screenOptions: {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPressColor: '#FAF0E6',
    tabBarStyle: { backgroundColor: "#FAF0E6"},
    tabBarLabelStyle: {fontSize: 20, fontWeight: 'bold'},
    tabBarIndicatorStyle: {
      backgroundColor: "#DBAFA0",
      height: 0
    },
    tabBarInactiveTintColor: '#D8D9DA',
    tabBarActiveTintColor: '#5C5470',
  }
});

function config() {
  return (
    <ConfigScreen />
);
}

function main() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6' }}>
      <ScrollView>
        <ChatButtonWithIcon 
            icon={<FontAwesome6 name='terminal' size={30} color={'#61677A'} iconStyle="solid" />}
            title='System Prompt'
            showText={true}
            style={menuButtonStyle}
            onPress={() => navigation.navigate('Prompt')} />
        <ChatButtonWithIcon
            icon={<FontAwesome6 name='brain' size={30} color={'#61677A'} iconStyle="solid" />}
            title='Model'
            showText={true}
            style={menuButtonStyle}
            onPress={() => navigation.navigate('Model')} />
        <ChatButtonWithIcon
            icon={<FontAwesome6 name='sliders' size={30} color={'#61677A'} iconStyle="solid" />}
            title='Config'
            showText={true}
            style={menuButtonStyle}
            onPress={() => navigation.navigate('Config')} />
      </ScrollView>
    </View>
  );
}

const chat = () => {
  return (
    <ChatScreen />
  );
};

const database = () => {
  return (
    <DatabaseScreen />
  );
};

const menuStack = createNativeStackNavigator(
  {
      initialRouteName: 'Main',
      screens: {
          Main: main,
          Prompt: prompt,
          Model: model, // replace with the tab navi stack
          Config: config
      },
      screenOptions: {
        title: "",
        headerStyle: {backgroundColor: "#FAF0E6", color: "#61677A" },
        headerShadowVisible: false,
      }
  }
);

type RootStackParamList = StaticParamList<typeof menuStack>;

const NavTabs = createMaterialTopTabNavigator({
  screens: {
    Menu: {
      screen: menuStack,
    },
    Chat: chat,
    Database: database,
  },
  screenOptions: 
      ({ route }) => ({
          // tabBarLabelStyle: {color: '#61677A', fontSize: 20},
          animationEnabled: false,
          swipeEnabled: false,
          tabBarItemStyle: { height: 60},
          tabBarPressColor: '#E6DDC4',
          tabBarStyle: { backgroundColor: "#E6DDC4"},
          tabBarIndicatorStyle: {
              backgroundColor: "#FAF0E6",
              height: 60
          },
          tabBarShowIcon: true,
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => {
            const icons = {
              Menu: "bars",
              Chat: "message",
              Database: "database"
            };

            const iconValue = icons[route.name as keyof typeof icons];
            if (iconValue === "bars") {
              return (
                  <FontAwesome6 name={'bars'} color={'#61677A'} size={30} iconStyle="solid"/>
              );
            } else if (iconValue === "message") {
              return (
                  <FontAwesome6 name={'message'} color={'#61677A'} size={30} iconStyle="solid"/>
              );
            } else if (iconValue === "database") {
              return (
                  <FontAwesome6 name={'database'} color={'#61677A'} size={30} iconStyle="solid"/>
              );
            } else {
              return (
                  <FontAwesome6 name={'question'} color={'#61677A'} size={30} iconStyle="solid"/>
              );
            }
          },
          // tabBarInactiveTintColor: '#B9B4C7',
          // tabBarActiveTintColor: '#61677A',
        }),
});

const Navigation = createStaticNavigation(NavTabs);

export default function App() {

    return (
      <AppContextProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </AppContextProvider>
    );
}
