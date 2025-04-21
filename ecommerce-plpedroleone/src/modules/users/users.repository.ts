// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/users.dto';
// import { UpdateUserDto } from './dto/updateUserDto';

// export interface User {
//   id?: number;
//   email?: string;
//   name?: string;
//   password?: string;
//   address?: string;
//   phone?: string;
//   country?: string | undefined;
//   city?: string | undefined;
// }

// @Injectable()
// export class UsersRepository {
//   private users: User[] = [
//     {
//       id: 1,
//       email: 'pl@mail.com',
//       name: 'Pedro',
//       password: 'admin1',
//       address: 'calle 1',
//       phone: '1123157862',
//       country: 'Argentina',
//       city: 'Buenos Aires',
//     },
//     {
//       id: 2,
//       email: 'la@mail.com',
//       name: 'Lucia',
//       password: 'admin2',
//       address: 'calle 2',
//       phone: '1116458695',
//       country: 'Argentina',
//       city: 'Buenos Aires',
//     },
//     {
//       id: 3,
//       email: 'gama@mail.com',
//       name: 'Gamaliel',
//       password: 'admin3',
//       address: 'calle 3',
//       phone: '1125852315',
//       country: 'Argentina',
//       city: 'Cordoba',
//     },
//     {
//       id: 4,
//       email: 'moni@mail.com',
//       name: 'Monica',
//       password: 'admin4',
//       address: 'calle 4',
//       phone: '2315627845',
//       country: 'Colombia',
//       city: 'Villavicencio',
//     },
//   ];

//   getAllUsers() {
//     return this.users.map(({ password, ...user }) => user);
//   }

//   getUserById(id: number) {
//     const user = this.users.find((user) => user.id === id);
//     if (!user) return null;
//     const { password, ...userWithoutPassword } = user;
//     return userWithoutPassword;
//   }

//   getUserByEmail(email: string): User | undefined {
//     return this.users.find((user) => user.email === email);
//   }

//   createUser(user: CreateUserDto) {
//     const id = this.users.length + 1;
//     user[id] = id;

//     this.users.push(user);
//     return id;
//   }

//   updateUser(id: number, user: UpdateUserDto) {
//     const findUser = this.users.find((user) => user.id === id);
//     const updatedUser = { ...findUser, ...user };

//     const index = this.users.findIndex((product) => product.id === id);
//     this.users[index] = updatedUser;
//     return id;
//   }

//   deleteUser(id: number) {
//     this.users.find((user) => user.id === id);
//     return id;
//   }
// }
