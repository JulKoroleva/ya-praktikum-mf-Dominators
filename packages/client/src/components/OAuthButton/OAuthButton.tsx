import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IOAuthButtonProps, IYaAuthSuggest } from './OAuthButton.interface';
import OAuthApi from '@/api/OAuthApi';
import styles from './OAuthButton.module.scss';
import { ROUTES } from '@/constants/routes';

declare global {
  interface Window {
    YaAuthSuggest: IYaAuthSuggest;
  }
}

const sdkSuggestScriptUrl =
  'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';

function OAuthButton({ onSuccess, onError }: IOAuthButtonProps) {
  const { pathname } = useLocation();

  const loadScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${sdkSuggestScriptUrl}"]`)) {
        resolve('OAuth script already loaded');
        return;
      }

      const script = document.createElement('script');
      script.src = sdkSuggestScriptUrl;
      script.onload = () => resolve('Script loaded');
      script.onerror = error => reject(error);

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    async function fetchServiceId() {
      try {
        const response = await OAuthApi.getServiceId({
          redirect_uri: `${window.location.origin}${ROUTES.oAuthTokenPage()}`,
        });

        if (response) {
          const serviceId = response.service_id;

          const oauthQueryParams = {
            response_type: 'code',
            client_id: serviceId,
            redirect_uri: `${window.location.origin}${ROUTES.oAuthTokenPage()}`,
          };
          const tokenPageOrigin = window.location.origin;
          // At the moment it is impossible to pull up user data from Yandex to display it in a button
          // due to Content Security Policy, which does not work on localhost,
          // so the button is activated after 5 seconds timeout
          // TODO: When deploying to the server, configure Content Security Policy
          window.YaAuthSuggest.init(oauthQueryParams, tokenPageOrigin, {
            view: 'button',
            parentId: 'YButtonContainer',
            buttonSize: 'xs',
            buttonView: 'additional',
            buttonTheme: 'light',
            buttonBorderRadius: 4,
            buttonIcon: 'yaEng',
          })
            .then(({ handler }) => {
              return handler();
            })
            .then(data => {
              onSuccess(JSON.stringify(data));
            })
            .catch(error => {
              onError(JSON.stringify(error));
            });
        }
      } catch (error) {
        onError(JSON.stringify(error));
      }
    }

    loadScript()
      .then(() => {
        fetchServiceId();
      })
      .catch(error => {
        onError(JSON.stringify(error));
      });
  }, [pathname]);

  return (
    <>
      <div id="YButtonContainer" className={styles['oauth-button__container']}></div>
    </>
  );
}

export default OAuthButton;
