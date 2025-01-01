export interface IOAuthButtonProps {
  onSuccess: (token: string) => void;
  onError: (errorMessage: string) => void;
}

export interface IYaAuthSuggest {
  init: (params: IOauthQueryParams, origin: string, options: IButtonConfig) => Promise<IAuthResult>;
}

interface IOauthQueryParams {
  response_type: string;
  client_id: string;
  redirect_uri: string;
}

interface IButtonConfig {
  view: string;
  parentId?: string;
  buttonView?: 'main' | 'additional' | 'icon' | 'iconBG';
  buttonTheme?: 'light' | 'dark';
  buttonSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  buttonBorderRadius?: number;
  buttonIcon?: 'ya' | 'yaEng';
  customBgColor?: string;
  customBgHoveredColor?: string;
  customBorderColor?: string;
  customBorderHoveredColor?: string;
  customBorderWidth?: number;
}

interface IAuthResult {
  handler: () => void;
  data: {
    token: string;
  };
}
