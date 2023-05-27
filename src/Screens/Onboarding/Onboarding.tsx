import React from 'react';
import { useState } from "react";
import { RootScreens } from "..";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'react-native-feather';
import Onboarding, { DoneButtonProps, DotProps, SkipButtonProps } from 'react-native-onboarding-swiper';
import StartedButton from '@/Components/StartedButton/StartedButton';
import { NextButtonProps } from 'react-native-onboarding-swiper';

export interface IOnboardProps {
    isLoading: boolean;
    onNavigate: (string: RootScreens) => void;
  }
export const OnboardingScreen = (props: IOnboardProps) => {
    const { isLoading, onNavigate } = props;
    const handleSkip = () => {
        onNavigate(RootScreens.LOGIN);
    };
    const handleDone = () => {
      onNavigate(RootScreens.LOGIN);
  };
    const DotComponent = ( {selected} : DotProps) => {
        return(
            <View
                style={{backgroundColor: selected ? '#1570EF' : '#E5E5E5',
                width: 8,
                height: 8,
                borderRadius: 6,
                marginHorizontal: 3,}}
            >
            </View>
        )
    };
    const Done = (props: DoneButtonProps) => {
        return (
            <StartedButton
                title='Bắt Đầu'
                {...props}
            />
        )
    };
    const Skip = (props: SkipButtonProps) => {
      return (
        <TouchableOpacity {...props}>
          <View>
            <Text style={{color: '#1570EF', marginLeft: 20}}>
              Bỏ qua
            </Text>
          </View>
        </TouchableOpacity>
      )
  };
    const Next = (props : NextButtonProps) => (
      <TouchableOpacity {...props}>
        <View  style={{ marginRight: 20, backgroundColor: '#1570EF' ,borderRadius: 20}}>
          <ChevronRight stroke='#fff' width={28} height={28}/>
        </View>
      </TouchableOpacity>

    );
    return (
        <Onboarding 
        imageContainerStyles={styles.image}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        pages={[
          {
            backgroundColor: '#CDE2FF',
            image: <Image source={require('../../../assets/onboarding1.png')}/>,
            title: 'Tìm đường nhanh chóng',
            subtitle: 'Bus Smart sử dụng dữ liệu theo thời gian thực, từ đó đưa ra cho bạn tuyến đường phù hợp với yêu cầu của bạn một cách nhanh chóng',
            
          },
          {
            backgroundColor: '#CDE2FF',
            image: <Image source={require('../../../assets/onboarding2.png')} style={{marginBottom: 35, marginTop: 30}}/>,
            title: 'Theo dõi trực tuyến',
            subtitle: 'Với tính năng theo dõi các tuyến xe trực tuyến, bạn sẽ biết được chính xác khi nào xe bus sẽ tới trạm và rời trạm, qua đó bạn có thể lập ra kế hoạch chính xác cho mình',
          },
          {
            backgroundColor: '#CDE2FF',
            image: <Image source={require('../../../assets/onboarding3.png')} style={{marginBottom: -22}}/>,
            title: 'Tiết kiệm tiền bạc và thời gian',
            subtitle: 'Bus Smart cung cấp cho bạn nhiều cách di chuyển khác nhau để bạn chọn ra tuyến đường tốt nhất với nhu cầu của bạn',
          },
        
        ]}
        DoneButtonComponent={Done}
        DotComponent={DotComponent}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        onSkip={handleSkip}
        onDone={handleDone}
        bottomBarColor='#CDE2FF'
      />
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    image: {
        width: '80%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24
    },
    subtitle: {
        fontSize: 18,
        paddingBottom: 90,
    }
  });
  export default OnboardingScreen;
  