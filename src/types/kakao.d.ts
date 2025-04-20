export {};

declare global {
  interface Window {
    Kakao?: {
      Share: {
        sendDefault: (settings: {
          objectType: 'text' | 'feed' | 'list' | 'location' | 'commerce';
          text?: string;
          link: {
            webUrl?: string;
            mobileWebUrl?: string;
            androidExecParams?: string;
            iosExecParams?: string;
          };
          buttonTitle?: string;
          buttons?: Array<{
            title: string;
            link: {
              webUrl?: string;
              mobileWebUrl?: string;
              androidExecParams?: string;
              iosExecParams?: string;
            };
          }>;
          // feed 타입에서 사용하는 속성들
          content?: {
            title?: string;
            description?: string;
            imageUrl?: string;
            link: {
              webUrl?: string;
              mobileWebUrl?: string;
              androidExecParams?: string;
              iosExecParams?: string;
            };
            imageWidth?: number;
            imageHeight?: number;
          };
          // list 타입에서 사용하는 속성들
          headerTitle?: string;
          headerLink?: {
            webUrl?: string;
            mobileWebUrl?: string;
            androidExecParams?: string;
            iosExecParams?: string;
          };
          contents?: Array<{
            title: string;
            description?: string;
            imageUrl?: string;
            link: {
              webUrl?: string;
              mobileWebUrl?: string;
              androidExecParams?: string;
              iosExecParams?: string;
            };
            imageWidth?: number;
            imageHeight?: number;
          }>;
          // commerce 타입에서 사용하는 속성들
          commerce?: {
            regularPrice: number;
            discountPrice?: number;
            discountRate?: number;
            fixedDiscountPrice?: number;
          };
          // location 타입에서 사용하는 속성들
          address?: string;
          addressTitle?: string;
          social?: {
            likeCount?: number;
            commentCount?: number;
            sharedCount?: number;
            viewCount?: number;
            subscriberCount?: number;
          };
          serverCallbackArgs?: Record<string, string> | string;
        }) => void;
        // 다른 메서드들
        sendCustom: (settings: {
          templateId: number;
          templateArgs?: Record<string, string>;
          serverCallbackArgs?: Record<string, string> | string;
        }) => void;
        sendScrap: (settings: {
          requestUrl: string;
          templateId?: number;
          templateArgs?: Record<string, string>;
          serverCallbackArgs?: Record<string, string> | string;
        }) => void;
      };
      isInitialized: () => boolean;
      init: (key: string) => void;
    };
  }
}
