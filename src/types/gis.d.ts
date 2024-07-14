declare namespace google {
    namespace accounts {
        namespace id {
            function initialize(options: { client_id: string; callback: (response: TokenResponse) => void;  prompt?: string }): void;
            function renderButton(element: HTMLElement, options: { width: number; theme: string; size: string }): void;
        }
      namespace oauth2 {
        interface TokenClientConfig {
          client_id: string;
          scope: string;
          callback: (response: TokenResponse) => void;
          prompt?: string;
        }
  
        interface TokenResponse {
          access_token: string;
          expires_in: number;
          token_type: string;
        }
  
        function initTokenClient(config: TokenClientConfig): TokenClient;
      }
  
      interface TokenClient {
        requestAccessToken(): void;
      }
    }
  }