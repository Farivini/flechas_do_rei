import { ImageSourcePropType } from 'react-native';

export type AvatarId = 'davi' | 'ana' | 'samuel';

export interface Avatar {
  id: AvatarId;
  name: string;
  avatar: ImageSourcePropType;
  body: ImageSourcePropType;
}

export const AVATARS: Avatar[] = [
  {
    id: 'davi',
    name: 'Davi',
    avatar: require('../../assets/images/avatars/davi_avatar.png'),
    body: require('../../assets/images/characters/davi_corpo.png'),
  },
  {
    id: 'ana',
    name: 'Ana',
    avatar: require('../../assets/images/avatars/ana_avatar.png'),
    body: require('../../assets/images/characters/ana_corpo.png'),
  },
  {
    id: 'samuel',
    name: 'Samuel',
    avatar: require('../../assets/images/avatars/samuel_avatar.png'),
    body: require('../../assets/images/characters/samuel_corpo.png'),
  },
];
