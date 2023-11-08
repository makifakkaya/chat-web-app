export interface User {
  _id: string;
  role: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSaveModel {
}

export interface UserUpdateModel extends UserSaveModel{
  id: string;
}
