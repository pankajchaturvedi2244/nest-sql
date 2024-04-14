import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
  schema: 'sys',
})
export class User {
  // {
  //     "id": 1,
  //     "name": "Leanne Graham",
  //     "username": "Bret",
  //     "email": "Sincere@april.biz",
  //     "address": {
  //         "street": "Kulas Light",
  //         "suite": "Apt. 556",
  //         "city": "Gwenborough",
  //         "zipcode": "92998-3874",
  //         "geo": {
  //             "lat": "-37.3159",
  //             "lng": "81.1496"
  //         }
  //     },
  //     "phone": "1-770-736-8031 x56442",
  //     "website": "hildegard.org",
  //     "company": {
  //         "name": "Romaguera-Crona",
  //         "catchPhrase": "Multi-layered client-server neural-net",
  //         "bs": "harness real-time e-markets"
  //     }
  // }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column({
    name: 'company_name',
  })
  company: string;

  @Column({ name: 'company_catchPhrase' })
  catchPhrase: string;

  @Column({ name: 'company_bs' })
  bs: string;
}
