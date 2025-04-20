declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      Link: {
        sendDefault: (options: unknown) => void;
      };
      Auth: {
        login: (options: unknown) => void;
        getStatusInfo: () => unknown;
      };
    };
  }
}
