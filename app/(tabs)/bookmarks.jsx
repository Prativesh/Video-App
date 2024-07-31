import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl } from 'react-native';
import VideoCard from '../../components/VideoCard';
import useAppwrite from '../../lib/useAppwrite';
import { getSavedPosts } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import EmptyState from '../../components/EmptyState';

const Saved = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getSavedPosts, [user.$id])
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard posts={item} showBookmark = {true}/>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Your Saved Videos
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Save a video"
          />
        )}
        refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Saved;
