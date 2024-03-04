import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { DashboardIcon, ProfileIcon } from '../general/SvgIcon';
const { height } = Dimensions.get('screen');

export function MainBottomNav({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#000' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1, gap: 8, alignItems: 'center', marginBottom: height * 0.03, borderTopColor: isFocused ? '#FFF' : '#FFF002FE', borderTopWidth: isFocused ? 3 : 1, paddingTop: 16 }}
            >
                {
                    route.name === 'Home' ? <View style={{ height: 30, width: 30, }}><DashboardIcon fill={isFocused ? '#FFF' : '#FFF002FE'} /></View> : <View style={{ height: 30, width: 30, }}><ProfileIcon fill={isFocused ? '#FFF' : '#FFF002FE'} /></View>
                }
                <Text style={{ color: isFocused ? '#FFF' : '#FFF002FE' }}>
                    {label}
                </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }