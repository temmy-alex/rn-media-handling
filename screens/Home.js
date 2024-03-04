import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainBottomNav } from '../components/layout/BottomNav';
import { HomeScreen } from './Main/Home';
import { ProfileScreen } from './Main/Profile';

const Tab = createBottomTabNavigator();

export default function HomeGroup(props) {
  return (
    <Tab.Navigator
      screenOptions={props => ({
        headerShown: false,
        header: () => {},
        headerStyle: {},
      })}
      initialRouteName={"Home"}
      backBehavior='history'
      tabBar={props => {        
        return (
          <View style={{ backgroundColor: 'transparent', position: 'absolute', left: 0, bottom: 0, right: 0 }}>
            <MainBottomNav {...props} />
          </View>
        )
      }}
    >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
