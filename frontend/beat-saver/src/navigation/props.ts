import { NavigationProp } from "@react-navigation/native";

export interface Props {
  navigation: NavigationProp<any>;
}

// messing around with the interfaces to fix the type errors lmao
export interface Parent {
  (
    email: string,
    firstName: string,
    lastName: string,
    currentUserId: string
  ): Promise<void>;
}

export interface Teen {
  (
    email: string,
    firstName: string,
    lastName: string,
    currentUserId: string
  ): Promise<void>;
}

export interface CreateUserFormProps extends Props {
  addParentUser?: Parent;
  addTeenUser?: Teen;
}
