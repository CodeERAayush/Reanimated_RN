import 'react-native-gesture-handler'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Animated, { CurvedTransition, EntryExitTransition, FadeIn, FadeInDown, FadeInLeft, FadeInUp, FadeOut, interpolate, JumpingTransition, LinearTransition, ReduceMotion, SequencedTransition, useAnimatedStyle, useSharedValue, withClamp, withDecay, withSpring, withTiming } from 'react-native-reanimated'
import { debounce } from 'lodash'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
const App = () => {
    let translatex=useSharedValue(0)
    let  translatey=useSharedValue(0)

    const [data,setData]=useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17])

    const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

//   const pan = Gesture.Pan()
//     .onBegin(event => {
//       translatex.value = event.absoluteX;
//       translatey.value = event.absoluteY;
//     })
//     .onChange(event => {
//       translatex.value = Math.max(0, Math.min(screenWidth - 100, event.absoluteX)); // Clamp within screen width
//       translatey.value = Math.max(0, Math.min(screenHeight - 100, event.absoluteY)); // Clamp within screen height
//     })
//     .onFinalize(event => {
//       translatex.value = Math.max(0, Math.min(screenWidth - 100, event.absoluteX));
//       translatey.value = Math.max(0, Math.min(screenHeight - 100, event.absoluteY));
//     });
const pan = Gesture.Pan()
    .onChange(event => {
      translatex.value = withClamp({min: 0, max:screenWidth - 100},withSpring(event.translationX + translatex.value));
      translatey.value = withClamp({min: 0,max: screenHeight - 125},withSpring(event.translationY + translatey.value));
    });

    const removeItem = (idToRemove) => {
        const updatedItems = data.filter((item) => item !== idToRemove);
        setData(updatedItems);
      };
    

    const animatedStyle=useAnimatedStyle(()=>{
        return {
            transform:[{translateX: translatex.value},{translateY:translatey.value}]
        }
    })

    

    const renderItem=({item,index})=>{
        return <Animated.View 
        layout={JumpingTransition} 
        exiting={FadeOut}
        key={Math.random()}
        style={{backgroundColor:'red',height:50,width:50, margin:5}}>
            <Text
            onPress={()=>removeItem(item)}
            >Aayush</Text>
        </Animated.View>
    }

return (
<View style={{flex:1}}>
<View
style={styles.gridContainer}
>
    {data.map((item) => (
          <Animated.View 
        layout={LinearTransition} 
        exiting={FadeOut}
        entering={FadeInDown}
        key={item}
        style={{backgroundColor:'red',height:50,width:50, margin:5}}>
            <Text
            onPress={()=>removeItem(item)}
            >{item}</Text>
        </Animated.View>
      ))}
</View>
</View>
//     const width=useSharedValue(10);
//     const [count,setCount]=useState(0);



//     const showThing=()=>{

//         if(count>=1){
//             width.value=withTiming(10)
//             const time=setTimeout(()=>{
//                 width.value=withSpring(1)
//             },500)
//         }

//         setCount(0)

//     }

   
//   const debouncedShowThing = useCallback(debounce(showThing, 500), [count]);

//   const handleClick = useCallback(() => {
//     setCount(prev => prev + 1);
//     debouncedShowThing();
//   }, [debouncedShowThing]);

//     const animatedShrink=useAnimatedStyle(()=>{
        
//         return {
//             opacity:interpolate(width.value,[1,10],[0,1]),
//             transform:[{scale:-interpolate(width.value,[1,10],[0,1])}]
//         }
//     })

//   return (
//     <View style={{flex:1,alignItems:'center',justifyContent: 'center',}}>
//       <Animated.View style={[animatedShrink,{justifyContent: 'center',alignItems:'center',backgroundColor:'pink',height:100}]}>
//         <Text>Animated Conatiner</Text>
//       </Animated.View>
//       <TouchableOpacity
//       onPress={()=>handleClick(true)}
//       style={{marginTop:30,backgroundColor:'white',elevation:5,padding:20}}>
//         <Text>Press</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//       onPress={()=>handleClick(false)}
//       style={{marginTop:30,backgroundColor:'white',elevation:5,padding:20}}>
//         <Text>Shrink</Text>
//       </TouchableOpacity>
//       </View>

// <GestureHandlerRootView >
  //  <GestureDetector gesture={pan}>
//<Animated.View style={[animatedStyle,{height:100,width:100,borderRadius:999,elevation:5,backgroundColor:'pink',alignItems:'center',justifyContent: 'center',}]}>
  //  <Text>Aaysuh</Text>
//</Animated.View>
//</GestureDetector>
// </GestureHandlerRootView> 


  )
}

export default App

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 32,
      },
})