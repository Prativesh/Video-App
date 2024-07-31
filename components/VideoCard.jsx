import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'
import { useGlobalContext } from '../context/GlobalProvider'
import { removePost, savePost } from '../lib/appwrite'

const VideoCard = ( {posts: {$id, title, thumbnail, video, creator: {username, avatar}, liked}, showBookmark = false} ) => {

    const [play, setPlay] = useState(false)
    const [bookmark, setBookmark] = useState(false)

    const { user } = useGlobalContext()

    useEffect( () => {
            if(liked.some(like => like.$id === user.$id)) {
                setBookmark(true)
            }
            else 
                setBookmark(false)
    }, [liked])

    const handleBookmark = async () => {
        try {
            if(bookmark == false) {
                const response = await savePost(user.$id, $id)
            } else {
                const response = await removePost(user.$id, $id)
            }
        } catch (error) {
            throw new Error(error)
        } finally {
            setBookmark(!bookmark)
        }
    }
    
  return (
    <View className= "flex-col px-4 mb-10">
        <View className = "flex-row items-center w-full mb-2">
            <View className = "rounded-lg border-secondary border mr-2">
                <Image
                    source={{uri: avatar}}
                    className = "w-[40px] h-[40px] rounded-lg"
                    resizeMode = "contain"
                />
            </View>
            <View className = 'flex-1 flex-col'>
                <Text className = "text-white">{title}</Text>
                <Text className = "text-white">{username}</Text>
            </View>
            <View>
                <Image 
                    source={icons.menu}
                    className = "h-5 w-5"
                    resizeMode='contain'
                />
            </View>
        </View>

        {
            play ?
            <Video
                source={{ uri: video }}
                className="w-full h-60 rounded-[33px] mt-3 "
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                        setPlay(false);
                    }
                }}
            />  : (
                <TouchableOpacity className = "w-full h-60 rounded-[33px] mt-3 items-center justify-center" onPress={() => {setPlay(true)}}>
                    <Image
                        source={{uri: thumbnail}}
                        resizeMode='cover'
                        className = "w-full h-full"
                    />
                    <Image
                        source = {icons.play}
                        resizeMode = 'contain'
                        className = "h-7 w-7 absolute"
                    />
                    { showBookmark ?
                    <TouchableOpacity className = "absolute bottom-2 right-4" onPress = {handleBookmark}>
                        {
                            bookmark ?
                                <Image
                                    source={icons.bookmark}
                                    resizeMode='contain'
                                    className = "w-6 h-6"
                                /> : 
                                <Image
                                    source={icons.plus}
                                    resizeMode='contain'
                                    className = "w-6 h-6"
                                />
                        }
                    </TouchableOpacity> : <></>
                    }
                </TouchableOpacity>
            )
        }
    </View>
  )
}

export default VideoCard;

















// <View className="flex">
//         <View className = "flex flex-col items-center px-4 mb-14">
//             <View className = "flex flex-row items-start gap-3 ">
//                 <View className = "flex-row flex-1 justify-center items-center">
//                 <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
//                         <Image
//                             source = {{uri: avatar}}
//                             className = "w-full h-full rounded-lg"
//                             resizeMode='cover'
//                         />
//                     </View>
//                     <View className = "flex-1 justify-center ml-3">
//                         <Text className = "text-white" numberOfLines={1}>{title}</Text>
//                         <Text className = "text-white" numberOfLines={1}>{username}</Text>
//                     </View>
//                 </View>
//                 <Image
//                     source = {icons.menu}
//                     className = "w-5 h-5"
//                     resizeMode='contain'
//                 />
//             </View>

//             {
//                 play ? 
//                 <Video
//                 source={{ uri: video }}
//                 className="w-full h-60 rounded-[33px] mt-3 "
//                 resizeMode={ResizeMode.CONTAIN}
//                 useNativeControls
//                 shouldPlay
//                 onPlaybackStatusUpdate={(status) => {
//                 if (status.didJustFinish) {
//                     setPlay(false);
//                 }
//                 }}
//             /> :
//             (
//                 <TouchableOpacity className = "w-full h-60 mt-3 relative flex justify-center items-center" activeOpacity={0.7} >
//                     <Image 
//                         source={{uri: thumbnail}}
//                         className = "w-full h-full"
//                         resizeMode='cover'
//                     />
//                     <Image
//                         source={icons.play}
//                         className = "w-6 h-6 absolute"
//                         resizeMode='contain'
//                         />
                    
//                     <View className = "items-end justify-end w-full">
//                         <Image
//                             source={icons.plus}
//                             className = "items-end justify-end h-5 w-5 absolute"
//                         />
//                     </View>
//                 </TouchableOpacity>
//             )
//             }
//         </View>
//     </View>