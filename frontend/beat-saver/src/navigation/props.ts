import { NavigationProp, Route, RouteProp } from "@react-navigation/native";
import { Modal as RNModal, ModalProps } from "react-native";
export interface Props {
  navigation: NavigationProp<any>;
}

// messing around with the interfaces to fix the type errors lmao
export interface Parent {
  (
    email: string,
    firstName: string,
    lastName: string,
    currentUserId: string,
    teens?: string
  ): Promise<void>;
}

export interface Teen {
  (
    email: string,
    firstName: string,
    lastName: string,
    currentUserId: string,
    parentUid: string
  ): Promise<void>;
}

export interface CreateUserFormProps extends Props {
  addParentUser?: Parent;
  addTeenUser?: Teen;
  parentUid?: string;
}

export interface UserProps {
  user: any;
  parentId: string;
}

export interface UserForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ExpenseItemProps {
  icon: string;
  title: string;
  subtitle: string;
  amount: string;
}

export interface HistoryItemProps {
  value: number;
  category: string;
  description: string;
  timestamp: string;
}

export interface DropdownItemProps {
  selected?: boolean;
}

export interface DropdownItemTextProps {
  selected?: boolean;
}

export interface KeypadButtonProps {
  isAdd?: boolean;
  isClear?: boolean;
  isDelete?: boolean;
}

export interface KeypadButtonTextProps {
  isAdd?: boolean;
  isDelete?: boolean;
}

export interface FlexSpacerProps {
  size?: number;
}

export type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

//parentHome.tsx types

// teen profile
export type Profile = {
  id: string;
  name: string;
  image: string;
  balance: number;
};

// teen expense
export type Expense = {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;       // e.g., 'Friday', '2023-10-20'
};

// allowance request
export interface AllowanceRequest {
  id: string;
  profileId: string;
  reason: string;
  amount: number;
  status: 'pending' | 'approved' | 'denied';
};

// modals
export type ModalType = 'profile' | 'allowance' | 'request';