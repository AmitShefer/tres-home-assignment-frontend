export interface UserModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
}
export interface LogInResponseModel {
  access_token: string;
  user: UserModel;
}

export interface UserTransaction {
  id: number;
  txn_hash: string;
  method: string;
  from: string;
  to: string;
  date: string;
  value: number;
  fee: number;
}
